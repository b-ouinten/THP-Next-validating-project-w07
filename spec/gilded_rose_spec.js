var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  let listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Lower the quality and sellIn of normal items by 1 (any item)", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 9, 
        expectedQuality: 19,
      },
      { 
        expectedSellIn: 2, 
        expectedQuality: 5,
      },
    ];

    expected.forEach(function ({expectedSellIn, expectedQuality}, idx) {
      const { sellIn, quality } = items[idx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    });
  });

  it("Increase the quality by 1 (Aged Brie and Backstage passes)", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 19, 
        expectedQuality: 31,
      },
      { 
        expectedSellIn: 19, 
        expectedQuality: 31,
      },
    ];

    expected.forEach(function ({expectedSellIn, expectedQuality}, idx) {
      const { sellIn, quality } = items[idx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    });
  });

  it("Increase the quality by 3 when there are less than six days left of the concert (Backstage passes)", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 4, 30));

    const gildedRose = new Shop(listItems);
    const item = gildedRose.updateQuality()[0];

    const expected = { 
      expectedSellIn: 3, 
      expectedQuality: 33,
    }

    const { expectedSellIn, expectedQuality } = expected;
    const { sellIn, quality } = item;

    expect(sellIn).toBe(expectedSellIn);
    expect(quality).toBe(expectedQuality);
  });
});