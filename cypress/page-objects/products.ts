import {
  createCssDict,
  ISelector,
  SelectorTypes,
} from "../lib/utility/css-selector";
import { BasePageObject } from ".";

const productCartFormSelectors: ISelector[] = [
  { k: "base", v: "cartForm", t: SelectorTypes.Attribute, a: "name" },
  { k: "title", v: "paragraph-title", t: SelectorTypes.Class },
  { k: "name", v: ".item-name .name", t: SelectorTypes.CSS },
];

const productCardSelectors: ISelector[] = [
  { k: "base", v: "addToCartForm", t: SelectorTypes.Attribute, a: "name" },
  { k: "addButton", v: "add-to-cart-button", t: SelectorTypes.Id },
];

const productListSelectors: ISelector[] = [
  { k: "base", v: "catalog-content", t: SelectorTypes.Id },
  { k: "firstProduct", v: ".product,[data-index='1']", t: SelectorTypes.CSS },
];

const productPopoutSelectors: ISelector[] = [
  { k: "base", v: "add-to-bag-popup-content", t: SelectorTypes.Id },
  { k: "viewBag", v: "btn-add-to-bag", t: SelectorTypes.Class },
  { k: "success", v: "modal-congrats", t: SelectorTypes.Class },
];

const product = createCssDict(productCardSelectors);
const productCartForm = createCssDict(productCartFormSelectors);
const productList = createCssDict(productListSelectors);
const productPopout = createCssDict(productPopoutSelectors);

class ProductCard extends BasePageObject {
  get baseSelector(): string {
    return product.base;
  }

  get addButton() {
    return this.self.find(product.addButton);
  }

  addToBag() {
    this.addButton.click();
  }
}

class ProductCartForm extends BasePageObject {
  get baseSelector(): string {
    return productCartForm.base;
  }

  get title() {
    return this.self.find(productCartForm.title);
  }

  get name() {
    return this.self.find(productCartForm.name);
  }
}

class ProductList extends BasePageObject {
  get baseSelector(): string {
    return productList.base;
  }

  clickFirstProduct() {
    this.self.find(productList.firstProduct).click();
  }
}

class ProductPopout extends BasePageObject {
  get baseSelector(): string {
    return productPopout.base;
  }

  get successModal() {
    return this.self.find(productPopout.success);
  }

  get viewBag() {
    return this.self.find(productPopout.viewBag);
  }

  clickViewBag() {
    this.viewBag.click();
  }

  successModalVisible() {
    this.successModal.should("be.visible");
  }
}

export { ProductCard, ProductCartForm, ProductList, ProductPopout };
