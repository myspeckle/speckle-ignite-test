import * as React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextStyle } from "react-native"

import { Screen, Text, Wallpaper } from "../components"
import { useStores } from "../models/root-store"
import { spacing, color } from "../theme"
import { NavigationScreenProp } from "react-navigation"

export interface ArticleScreenProps {
  navigation: NavigationScreenProp<{}>
  title: string
}

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const BOLD: TextStyle = { fontWeight: "bold" }

const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}

const CONTENT: TextStyle = {
  ...TEXT,
  fontSize: 20,
}

export const ArticleScreen: React.FunctionComponent<ArticleScreenProps> = observer(() => {
  const rootStore = useStores()

  const { title, content } = rootStore.currentArticle || {}

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text={title} />
        </Text>
        <View>
          <Text style={CONTENT} text={content} />
        </View>
      </Screen>
    </View>
  )
})
