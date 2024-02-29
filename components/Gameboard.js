import { useEffect, useState } from "react"
import { Pressable, Text, View } from "react-native"
import {
    NBR_OF_DICES, 
    NBR_OF_THROWS,
    MAX_SPOT,
    BONUS_POINTS_LIMIT,
    BONUS_POINTS,
    SCOREBOARD_KEY
} from "../constants/Game";
import { Container, Row, Col } from "react-native-flex-grid";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    ICONS,
    SELECTED,
    DICES} from "../constants/Colors";
import { moderateScale } from "./Metrics";

let board = [];

export default Gameboard = ({route}) => {

    const [playerName, setPlayerName] = useState("");
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState("");
    const [gameEndStatus, setGameEndStatus] = useState(false);

    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));

    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));

    const [dicePoints, setDicePoints] = useState(new Array(MAX_SPOT).fill(0));

    const [totalPoints, setTotalPoints] = useState(0);

    const [bonusPointsGiven, setBonusPointsGiven] = useState(false);

    const [gameStarted, setGameStarted] = useState(false);
    
    useEffect(() => {
        if (playerName === "" && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    useEffect(() => {
        if (gameEndStatus) {
            checkBonusPoints();
        }
    }, [gameEndStatus]);
    

    useEffect(() => {
        if (gameEndStatus) {
            const now = new Date();
            const day = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            const hours =  now.getHours();
            const minutes = ('0' + now.getMinutes()).slice(-2);

            const timestamp = `${day}.${month}.${year} ${hours}:${minutes}`;
            setStatus("Game over. You can start a new game.");
            const scoreData = {
                playerName: playerName,
                time: timestamp,
                points: totalPoints
            };
            storeData(scoreData);
        } else {
            if(nbrOfThrowsLeft === NBR_OF_THROWS) {
                setStatus("Throw dices");
            }
            if (nbrOfThrowsLeft < 0) {
                setNbrOfThrowsLeft(NBR_OF_THROWS);
            }
            calculateTotalPoints();
            checkGameEnd();       
            checkBonusPoints();
        }
    }, [nbrOfThrowsLeft, totalPoints, gameEndStatus, dicePoints]);

    const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col style={styles.dicesRow} key={"dice" + dice}>
                <Pressable
                    key={"dice" + dice}
                    onPress={() => selectDice(dice)}
                >
                    <MaterialCommunityIcons 
                        name={board[dice]}
                        key={"dice" + dice}
                        size={moderateScale(50)}
                        color={getDiceColor(dice)}
                    />
                </Pressable>
            </Col>
        )
    }

    const pointsRow = [];
    for (let i = 0; i < MAX_SPOT; i ++) {
        pointsRow.push(
            <Col style={styles.dicesRow} key={"dicePont" + i}>
                <Text style={styles.dicePoints}>{dicePoints[i]}</Text>
                <Pressable
                    key={"dicePoint" + i}
                    onPress={() => selectDicePoint(i)}
                >
                    <MaterialCommunityIcons 
                        name={"numeric-" + (i + 1) + "-circle"}
                        key={"dicePoint" + i}
                        size={moderateScale(35)}
                        color={getDicePointColor(i)}
                    />

                </Pressable>
            </Col>
        )
    }

    function getDiceColor(i) {
        return selectedDices[i] ? SELECTED : DICES;
    }

    function getDicePointColor (i) {
        return selectedDicePoints[i] ? ICONS : DICES;
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
        else if (!gameEndStatus) {
            setStatus("You have to throw dices first");
        }
    }

    const selectDicePoint = (i) => {
        if (nbrOfThrowsLeft !== 0 && !gameEndStatus) {
            setStatus("Throw 3 times before setting points")
        } else if (selectedDicePoints[i] === false && !gameEndStatus) {
            let selectedDices = [...selectedDicePoints];
            selectedDices[i] = selectedDicePoints[i] ? false : true;
            setSelectedDicePoints(selectedDices);
            sumOfPoints = countPoints(i+1) * (i+1);
            let newDicePoints = [...dicePoints];
            newDicePoints[i] = sumOfPoints;
            setDicePoints(newDicePoints);
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            setStatus("You have to throw dices first");
            undoSelectedDices();
        } else if (!gameEndStatus) {
            setStatus("You have already selected points for " + (i+1));
        }
    }

    const undoSelectedDices = () => {
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }



    const throwDices = () => {
        setGameStarted(true);
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            setStatus("Select your points before the next throw");
        }
        else if (!gameEndStatus) {
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = "dice-" + randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
            setStatus("Select and throw dices again");
        }
    }

    const countPoints = (selectedPointSpot) => {
        let points = board.reduce((total, x) => total + (x == "dice-" + selectedPointSpot), 0);
        return points;
    }

    const calculateTotalPoints = () => {
        let points = dicePoints.reduce((partialSum, x) => partialSum + x, 0);
        if (bonusPointsGiven) {
            setTotalPoints(points + BONUS_POINTS);
        }
        else {
            setTotalPoints(points);
        }
    }

    const checkGameEnd = () => {
        setGameEndStatus(selectedDicePoints.every(x => x));
    }

    const checkBonusPoints = () => {
        if (totalPoints >= BONUS_POINTS_LIMIT && !bonusPointsGiven) {
            setTotalPoints(prevTotalPoints => prevTotalPoints + BONUS_POINTS);
            setBonusPointsGiven(true);
        }
    }

    const resetGame = () => {
        setGameStarted(false);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setGameEndStatus(false);
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePoints(new Array(MAX_SPOT).fill(0));
        setTotalPoints(0);
        setBonusPointsGiven(false);
    }

    const storeData = async (value) => {
        try {
            const existingData = await AsyncStorage.getItem(SCOREBOARD_KEY);
            let newData = [];
    
            if (existingData !== null) {
                newData = JSON.parse(existingData);
            }
    
            newData.push(value);
    
            const jsonValue = JSON.stringify(newData);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);

        } catch (error) {
            console.log("Error storing data:", error);
        }
    }


    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.centerContentGameboard}>
                    {
                        gameStarted
                        ? <Container fluid>
                            <Row>{dicesRow}</Row>
                        </Container>
                        :
                            <MaterialCommunityIcons 
                                name="dice-multiple"
                                size={moderateScale(90)}
                                color={ICONS}
                                style={styles.dicesRow}
                            />
                    }
                <Text style={styles.status}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.status}>{status}</Text>
                <Pressable style={styles.buttonGameboard} onPress={() => throwDices()}>
                    <Text style={styles.buttonText}>THROW DICES</Text>
                </Pressable>
                <Pressable style={styles.buttonGameboard} onPress={() => resetGame()}>
                    <Text style={styles.buttonText}>RESET GAME</Text>
                </Pressable>
                <Text style={styles.totalPoints}>Total: {totalPoints}</Text>
                {
                    totalPoints >= BONUS_POINTS_LIMIT
                    ? <Text style={styles.status}>Congrats! Bonus points ({BONUS_POINTS}) have been added.</Text>
                    : <Text style={styles.status}>You are {BONUS_POINTS_LIMIT - totalPoints} points away from bonus</Text>
                }
                <Container fluid>
                    <Row>{pointsRow}</Row>
                </Container>
                <Text style={styles.status}>Player: {playerName}</Text>
            </View>
            <Footer />
        </View>
    )
}