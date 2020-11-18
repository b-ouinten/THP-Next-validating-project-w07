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

  it("Lower the quality by 2 if the expiration date has already been reached (normal items) !", function () {
    listItems.push(new Item("Mana Cake", 0, 30));
    listItems.push(new Item("Pop-corn", -1, 20));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: -1, 
        expectedQuality: 28,
      },
      { 
        expectedSellIn: -2, 
        expectedQuality: 18,
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

  it("The quality pass to zero and stay there when the expiration date has already passed (Backstage) !", function () {
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

  it("The quality of Sulfuras never changes !", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 4, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 4, 
        expectedQuality: 50,
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

  it("The quality will not be changed if it is higher than 50 !", function () {
    listItems.push(new Item("Mana Cake", 2, 52));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 7, 51));
    listItems.push(new Item("Aged Brie", 10, 51));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    const expected = [
      { 
        expectedSellIn: 1, 
        expectedQuality: 51,
      },
      { 
        expectedSellIn: 6, 
        expectedQuality: 51,
      },
      { 
        expectedSellIn: 9, 
        expectedQuality: 51,
      },
    ];

    expected.forEach(({expectedSellIn, expectedQuality}, indx) => {
      const { sellIn, quality } = items[indx];

      expect(sellIn).toBe(expectedSellIn);
      expect(quality).toBe(expectedQuality);
    })
  });
});