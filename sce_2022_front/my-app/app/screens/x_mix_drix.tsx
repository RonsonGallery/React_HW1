import React, { FC, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  SafeAreaView,
  Alert,
} from "react-native";

export type Props = {
  name: string;
};

type Player = {
  player: number
}
type BrickState = {
  index: number
  state: number
  turn: Player
  onClick: (index: number) => void
}

const Brick: FC<{ brickState: BrickState }> = ({ brickState }) => {
  const [num, setValue] = useState<number>(0)

  const images =
    [require("../assets/empty.gif"),
    require("../assets/x.png"),
    require("../assets/o.png")]

  const handleClick = () => {
    brickState.state = brickState.turn.player
    brickState.onClick(brickState.index)
    setValue(num + 1)
  }

  const backgroundColors =
    ["white", "white", "white"]

  return (
    <View style={[styles.brick,
    { backgroundColor: backgroundColors[brickState.state] }
    ]}>
      <TouchableOpacity disabled={brickState.state != 0} style={styles.brickTouch}
        onPress={handleClick}
      >
        <Image resizeMode="contain" source={images[brickState.state]} style={styles.brickImage}></Image>
      </TouchableOpacity>
    </View>
  )
}

const XmixDrix: FC = () => {
  const [turn, setTurn] = useState<{ player: number }>({ player: 1 })
  const [num, setNum] = useState<number>(0) //force refresh
  const [topMessage, setTopMessage] = useState<string>("X Mix Drix")
  enum BunnerDisplay {
    xplay = 0, oplay = 1, xwin = 2, owin = 3, nowin
  }
  const [bannerDisplay, setBannerDisplay] = useState<BunnerDisplay>(BunnerDisplay.xplay)


  const bottomBanner = [
    require("../assets/xplay.gif"),
    require("../assets/oplay.gif"),
    require("../assets/xwin.gif"),
    require("../assets/owin.gif"),
    require("../assets/nowin.gif")
  ]
  const handleClick = (index: number) => {
    console.log("handleClick")
    let win = checkWin()
    if (win == 0) {
      turn.player += 1
      if (turn.player == 3) {
        turn.player = 1
        setBannerDisplay(BunnerDisplay.xplay)
      } else {
        setBannerDisplay(BunnerDisplay.oplay)
      }
    }
  }

  const [bricks, setValue] = useState<Array<BrickState>>([])
  for (let i = 0; i < 9; i++) {
    bricks.push({ index: i, state: 0, turn: turn, onClick: handleClick })
  }

  const restart = () => {
    console.log("restart")
    setTopMessage("X Mix Drix")
    bricks.forEach(element => {
      element.state = 0
    });
    setBannerDisplay(BunnerDisplay.xplay)
    setNum(num + 1)
    turn.player = 1
  }

  const checkWin = () => {
    console.log("checkWin")
    let winner = 0


    //Coloums
    if (bricks[0].state != 0 && bricks[0].state == bricks[1].state && bricks[0].state == bricks[2].state) {
      console.log("game over 1")
      winner = bricks[0].state
    } 

    if (bricks[3].state != 0 && bricks[3].state == bricks[4].state && bricks[3].state == bricks[5].state) {
      winner = bricks[3].state
    } 

    if (bricks[6].state != 0 && bricks[6].state == bricks[7].state && bricks[6].state == bricks[8].state) {
      winner = bricks[6].state
    } 

    // Rows

    if (bricks[0].state != 0 && bricks[0].state == bricks[3].state && bricks[0].state == bricks[6].state) {
      winner = bricks[0].state
    }
    if (bricks[1].state != 0 && bricks[1].state == bricks[4].state && bricks[1].state == bricks[7].state) {
      winner = bricks[1].state
    }
    if (bricks[2].state != 0 && bricks[2].state == bricks[5].state && bricks[2].state == bricks[8].state) {
      winner = bricks[2].state
    }

    //diagonals

    if (bricks[0].state != 0 && bricks[0].state == bricks[4].state && bricks[0].state == bricks[8].state) {
      winner = bricks[0].state
    }

    if (bricks[2].state != 0 && bricks[2].state == bricks[4].state && bricks[2].state == bricks[6].state) {
      winner = bricks[2].state
    }


    console.log("no win")
    if (winner > 0) {
      setTopMessage("Game Over")
      if (winner == 1) {
        setBannerDisplay(BunnerDisplay.xwin)
      } else {
        setBannerDisplay(BunnerDisplay.owin)
      }
    }
    return winner
  }

  return (
    <View style={styles.container} >
      <Text style={styles.topMessage}>{topMessage}</Text>
      <View style={styles.board}>
        <View style={styles.row_container}>
          <Brick brickState={bricks[0]}></Brick>
          <Brick brickState={bricks[1]}></Brick>
          <Brick brickState={bricks[2]}></Brick>
        </View>
        <View style={styles.row_container}>
          <Brick brickState={bricks[3]}></Brick>
          <Brick brickState={bricks[4]}></Brick>
          <Brick brickState={bricks[5]}></Brick>
        </View>
        <View style={styles.row_container}>
          <Brick brickState={bricks[6]}></Brick>
          <Brick brickState={bricks[7]}></Brick>
          <Brick brickState={bricks[8]}></Brick>
        </View>
      </View>
      <View style={styles.bottomBannerContainer}>
        <Image source={bottomBanner[bannerDisplay]} style={styles.bottomBanner}></Image>
      </View>
      <View style={styles.buttons_container}>
        <TouchableOpacity style={styles.button}
          onPress={restart}>
          <Text style={{ fontSize: 20 }}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};


const styles = StyleSheet.create({
  board: {
    width: "100%",
    aspectRatio: 1,
    padding: 5,
  },
  topMessage: {
    width: "100%",
    height: 50,
    textAlign: "center",
    paddingTop: 5,
    fontSize: 30
  },
  container: {
    width: "100%",
    backgroundColor: "grey",
    flex: 1
  },
  row_container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignContent: "center"
  },
  buttons_container: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    paddingBottom: 15
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    flex: 1,
    borderRadius: 5,
    height: 50
  },
  brick: {
    margin: 5,
    backgroundColor: "red",
    flex: 1,
    aspectRatio: 1
  },
  brickTouch: {
    flex: 1,
  },
  brickImage: {
    width: "100%",
    height: "100%"
  },
  bottomBanner: {
    flex: 1,
    resizeMode: "stretch",
    width: "100%",
  },
  bottomBannerContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
  }
})
export default XmixDrix;
