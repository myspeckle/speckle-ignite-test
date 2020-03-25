import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NavigationStoreModel } from "../../navigation/navigation-store"
const SECTION_DATA = require("./section-data.json")

export const ArticleModel = types.model({
  id: types.identifier,
  title: types.string,
  content: types.string,
})

export const SectionModel = types.model({
  title: types.string,
  articles: types.array(ArticleModel),
})

export const RootStoreModel = types
  .model("RootStore")
  .props({
    navigationStore: types.optional(NavigationStoreModel, {}),
    sections: types.array(SectionModel),
    currentArticle: types.maybe(types.reference(ArticleModel)),
  })
  .actions(self => ({
    afterCreate() {
      self.sections = SECTION_DATA.sections
    },
    setCurrentArticle(article: Article) {
      self.currentArticle = article
    },
  }))

export interface RootStore extends Instance<typeof RootStoreModel> {}
export interface Section extends Instance<typeof SectionModel> {}
export interface Article extends Instance<typeof ArticleModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
