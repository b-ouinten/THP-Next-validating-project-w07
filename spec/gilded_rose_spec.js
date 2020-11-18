var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  let listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("Lower the quality and sellIn of normal items by 1 (normal items) !", function () {
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

  it("Lower the quality by 2 if the expiration date has been reached (normal items) !", function () {
    listItems.push(new Item("Mana Cake", 1, 29));
    listItems.push(new Item("Pop-corn", 0, 20));
    listItems.push(new Item("Eyewear", -1, 1));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 0, 
        expectedQuality: 28,
      },
      { 
        expectedSellIn: -1, 
        expectedQuality: 18,
      },
      { 
        expectedSellIn: -2, 
        expectedQuality: 0,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });

  it("Increase the quality by 1 (Aged Brie and Backstage) !", function () {
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

  it("Increase the quality by 2 when there are less than eleven days left of the concert (Backstage) !", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 9, 30));
    listItems.push(new Item("Mana Cake", 4, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 8, 
        expectedQuality: 32,
      },
      { 
        expectedSellIn: 3, 
        expectedQuality: 29,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });

  it("Increase the quality by 3 when there are less than six days left of the concert (Backstage) !", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 4, 30));
    listItems.push(new Item("Mana Cake", 4, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 3, 
        expectedQuality: 33,
      },
      { 
        expectedSellIn: 3, 
        expectedQuality: 29,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });

  it("The quality pass to zero and stay there when the expiration date has assed (Backstage) !", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", -1, 5));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", -2, 51));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: -1, 
        expectedQuality: 0,
      },
      { 
        expectedSellIn: -2, 
        expectedQuality: 0,
      },
      { 
        expectedSellIn: -3, 
        expectedQuality: 0,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });

  it("The quality of Sulfuras already equal to 80 !", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 4, 80));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 3, 
        expectedQuality: 80,
      },
      { 
        expectedSellIn: 4, 
        expectedQuality: 33,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });

  it("Lower the quality of conjured items by 2 !", function () {
    listItems.push(new Item("Conjured Dark Blade", 10, 18));
    listItems.push(new Item("Conjured Dark Blade", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 9, 
        expectedQuality: 16,
      },
      { 
        expectedSellIn: 2, 
        expectedQuality: 4,
      },
    ];

    expected.forEach(function ({expectedSellIn, expectedQuality}, idx) {
      const { sellIn, quality } = items[idx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    });
  });

  it("Lower the quality by 4 if the expiration date has been reached (conjured items) !", function () {
    listItems.push(new Item("Conjured Mana Cake", 1, 29));
    listItems.push(new Item("Conjured Pop-corn", 0, 20));
    listItems.push(new Item("Conjured Eyewear", -1, 1));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 0, 
        expectedQuality: 27,
      },
      { 
        expectedSellIn: -1, 
        expectedQuality: 16,
      },
      { 
        expectedSellIn: -2, 
        expectedQuality: 0,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });

  it("The quality shold never drop below zero !", function () {
    listItems.push(new Item("Mana Cake", 10, 0));
    listItems.push(new Item("Pop-corn", -1, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 9, 
        expectedQuality: 0,
      },
      { 
        expectedSellIn: -2, 
        expectedQuality: 0,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });

  it("The quality cannot exceed 50 !", function () {
    listItems.push(new Item("Mana Cake", 2, 52));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 7, 51));
    listItems.push(new Item("Aged Brie", 10, 51));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 1, 
        expectedQuality: 50,
      },
      { 
        expectedSellIn: 6, 
        expectedQuality: 50,
      },
      { 
        expectedSellIn: 9, 
        expectedQuality: 50,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });
});