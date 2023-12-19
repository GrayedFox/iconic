import {
  ProductCard,
  ProductCartForm,
  ProductList,
  ProductPopout,
  SearchBar,
  SearchWrapper,
} from "../page-objects";

const searchBar = new SearchBar();
const searchWrapper = new SearchWrapper();
const productCard = new ProductCard();
const productCartForm = new ProductCartForm();
const productList = new ProductList();
const productPopout = new ProductPopout();

const searchTerm = "yves lash clash";
const paragraphTitle = "DELIVERY 1 OF 1";
const productName = "Lash Clash Mascara";

describe("iconic test scenarios", () => {
  before(() => {
    searchWrapper.open();
    searchWrapper.hasFinishedLoading();
    searchWrapper.clickSearchField();
    searchBar.searchFor(searchTerm);
  });

  it("can add an item to the cart", () => {
    productList.clickFirstProduct();
    productCard.addToBag();
    productPopout.successModalVisible();
  });

  it("can view added items", () => {
    productPopout.clickViewBag();
    productCartForm.title.should("contain.text", paragraphTitle);
    productCartForm.name.should("contain.text", productName);
  });

  it.skip("can proceed to the checkout page", () => {
    // couldn't test this due to CloudFlare protections
  });
});
