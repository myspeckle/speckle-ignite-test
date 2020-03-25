import * as React from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SectionList,
  SectionListData,
  TouchableOpacity,
} from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Screen, Text, Wallpaper } from "../components"
import { color, spacing } from "../theme"
import { useStores, Article } from "../models/root-store"
const LOGO_PNG = require("./speckle-200px.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const SECTION_HEADER: TextStyle = { ...HEADER, fontSize: 40 }
const ROW_WRAPPER: ViewStyle = {
  flexDirection: "row",
  backgroundColor: "purple",
  margin: 1,
  padding: 10,
}
const ROW_TITLE: TextStyle = { ...TEXT, fontSize: 20 }
const ROW_LOGO: ImageStyle = {
  alignSelf: "center",
  width: 30,
  height: 30,
  marginRight: 10,
}

export interface WelcomeScreenProps extends NavigationInjectedProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const rootStore = useStores()

  const sections: SectionListData<Article>[] = rootStore.sections
    .map(({ title, articles }) => ({
      title,
      data: articles.slice(),
    }))
    .slice()

  return (
    <View style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} text="Speckle Learn" />
        </Text>
        <SectionList
          sections={sections}
          keyExtractor={(article, index) => article.id + index}
          renderSectionHeader={sections => (
            <Text style={SECTION_HEADER} text={sections.section.title} />
          )}
          renderItem={({ item: article }) => (
            <TouchableOpacity
              style={ROW_WRAPPER}
              onPress={() => {
                rootStore.setCurrentArticle(article)
                props.navigation.navigate("article")
              }}
            >
              <Image source={LOGO_PNG} style={ROW_LOGO} />
              <Text style={ROW_TITLE} text={article.title} />
            </TouchableOpacity>
          )}
        />
      </Screen>
    </View>
  )
}
