class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  
  updateQuality() {
    this.sellIn--;

    if (this.name === 'Aged Brie') {
      this.quality++;
    } else if (/^Backstage\s/.test(this.name)) {
      if (this.sellIn < 0) this.quality = 0;
      else if (this.sellIn < 6) this.quality += 3;
      else if (this.sellIn < 11) this.quality += 2;
      else this.quality++;
    } else if (/^Sulfuras/.test(this.name)) {
      this.quality = 80;
    } else if (/^Conjured\s/.test(this.name)) {
      if (this.sellIn >= 0) this.quality -=2;
      else this.quality -= 4;
    } else {
      if (this.sellIn >= 0) this.quality--;
      else this.quality -= 2;
    }
    
    if (this.name !== 'Sulfuras, Hand of Ragnaros') {
      if (this.quality < 0) this.quality = 0;
      if (this.quality > 50) this.quality = 50;
    }
  }
}

class Shop {
  constructor(items = []){
    this.items = items;
  }
  
  updateQuality() {
    this.items.forEach((item) => item.updateQuality());

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
