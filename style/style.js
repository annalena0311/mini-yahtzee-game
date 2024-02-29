import { StyleSheet } from 'react-native';
import {
  PRIMARY_ONE, 
  PRIMARY_TWO, 
  BACKGROUND_COLOR, 
  TEXT_ON_DARK,
  ICONS} from "../constants/Colors";
import { horizontalScale, verticalScale, moderateScale } from "../components/Metrics";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  header: {
    marginBottom: verticalScale(15),
    backgroundColor: PRIMARY_TWO,
    flexDirection: 'row',
  },
  footer: {
    marginTop: verticalScale(20),
    backgroundColor: PRIMARY_TWO,
    flexDirection: 'row',
    paddingBottom: verticalScale(10)
  },
  title: {
    color: TEXT_ON_DARK,
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(25),
    textAlign: 'center',
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10)
  },
  author: {
    color: TEXT_ON_DARK,
    fontWeight: 'bold',
    flex: 1,
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10)
  },
  rulesTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
    fontSize: moderateScale(25)
  },
  rulesText: {
    textAlign: "justify",
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(20),
    fontSize: moderateScale(15)
  },
  centerContent: {
    justifyContent: "center",
    alignItems: 'center',
    flex: 1
  },
  centerContentGameboard: {
    justifyContent: "space-between",
    alignItems: 'center',
    flex: 1
  },
  input: {
    borderColor: ICONS,
    borderWidth: moderateScale(2),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(5),
    fontSize: moderateScale(17),
    marginTop: verticalScale(10)
  },
  icon: {
    marginBottom: verticalScale(10)
  },
  button: {
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(15),
    flexDirection: "row",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    backgroundColor: PRIMARY_ONE,
    width: horizontalScale(150),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonGameboard: {
    flexDirection: "row",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    backgroundColor: PRIMARY_ONE,
    width: horizontalScale(150),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonScoreboard: {
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(15),
    flexDirection: "row",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    backgroundColor: PRIMARY_ONE,
    width: horizontalScale(150),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(50)
  },
  buttonText: {
    color: TEXT_ON_DARK,
    fontSize: moderateScale(17),
    fontWeight: "bold",
    textAlign: "center"
  },
  tableHeader: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    marginTop: verticalScale(10)
  },
  tableCell: {
    fontSize: moderateScale(15),
    textAlign: "center",
  },
  tableItems: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomWidth: moderateScale(2),
    borderColor: ICONS
  },
  dicePoints: {
    textAlign: "center",
    fontSize: moderateScale(18),
    marginBottom: verticalScale(10)
  },
  status: {
    fontSize: moderateScale(20)
  },
  totalPoints: {
    fontSize: moderateScale(25),
    fontWeight: "bold"
  },
  dicesRow: {
    marginTop: verticalScale(20),
    alignItems: "center",
    justifyContent: "center"
  }
});