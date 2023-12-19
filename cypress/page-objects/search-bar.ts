import {
  createCssDict,
  ISelector,
  SelectorTypes,
} from "../lib/utility/css-selector";
import { BasePageObject } from ".";

const searchWrapperSelectors: ISelector[] = [
  { k: "base", v: "mini-search-bar-wrapper", t: SelectorTypes.Class },
  { k: "searchField", v: "search-field", t: SelectorTypes.Class },
];

const mainSearchSelectors: ISelector[] = [
  { k: "base", v: "main-search-form", t: SelectorTypes.Id },
  { k: "searchInput", v: "search-input", t: SelectorTypes.Id },
];

const searchWrapper = createCssDict(searchWrapperSelectors);
const searchBar = createCssDict(mainSearchSelectors);

class SearchBar extends BasePageObject {
  get baseSelector(): string {
    return searchBar.base;
  }

  get searchInput() {
    return this.self.find(searchBar.searchInput);
  }

  searchFor(searchTerm: string) {
    this.searchInput.type(searchTerm);
    this.searchInput.type("{enter}");
  }
}

class SearchWrapper extends BasePageObject {
  get baseSelector(): string {
    return searchWrapper.base;
  }

  get searchField() {
    return this.self.find(searchWrapper.searchField);
  }

  clickSearchField() {
    this.self.find(searchWrapper.searchField).first().click();
  }
}

export { SearchBar, SearchWrapper };
