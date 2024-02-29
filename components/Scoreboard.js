import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/style";
import { DataTable } from "react-native-paper";
import { useEffect, useState } from "react";
import { SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICONS } from "../constants/Colors"
import { moderateScale } from "./Metrics";


export default Scoreboard = ({navigation}) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getData();
        });
        return unsubscribe;
    }, [navigation]);

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            setScores([]);
        } catch (error) {
            console.log("Error clearing AsyncStorage:", error);
        }
    };

    const getData = async() => {
        try {
            return AsyncStorage.getItem(SCOREBOARD_KEY)
            .then(req => JSON.parse(req))
            .then(json => {
                if (json === null) {
                    json = [];
                }
                json.sort((a, b) => b.points - a.points);
                setScores(json);
            })
        } catch (error) {
            console.log("Error getting data:", error);
        }
    }

    return(
        <View style={styles.container}>
            <Header />
            <View style={styles.centerContent}>
                <MaterialCommunityIcons 
                    name="medal"
                    size={moderateScale(75)}
                    color={ICONS}
                />
                <Text style={styles.rulesTitle}>Top Three</Text>

                {
                    scores.length === 0
                    ? (<Text style={styles.status}>Scoreboard is empty</Text>)
                    : (
                        <DataTable>
                            <DataTable.Header style={{ borderBottomWidth: 0}}>
                                <DataTable.Title style={styles.tableItems} textStyle={styles.tableHeader}>Playername</DataTable.Title>
                                <DataTable.Title style={styles.tableItems} textStyle={styles.tableHeader}>Timestamp</DataTable.Title>
                                <DataTable.Title style={styles.tableItems} textStyle={styles.tableHeader}>Total points</DataTable.Title>
                            </DataTable.Header>

                            {scores.slice(0, 3).map((score, index) => (
                                <DataTable.Row style={{ borderBottomWidth: 0}} key={"tableRow" + index}>
                                    <DataTable.Cell style={styles.tableItems} textStyle={styles.tableCell}>{(index + 1) + ". " + score.playerName}</DataTable.Cell>
                                    <DataTable.Cell style={styles.tableItems} textStyle={styles.tableCell}>{score.time}</DataTable.Cell>
                                    <DataTable.Cell style={styles.tableItems} textStyle={styles.tableCell}>{score.points}</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    )
                }

                <Pressable style={styles.buttonScoreboard}>
                        <Text style={styles.buttonText} onPress={clearStorage}>CLEAR SCOREBOARD</Text>
                </Pressable>
            </View>
            <Footer />
        </View>
    )
}