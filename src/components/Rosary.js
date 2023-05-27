export default class Rosary {
  imgUrlTemplate = "/cdn-cgi/imagedelivery/nrDxkOKXwTWQqwFQgJIvZQ/rosary/${CATEGORY}/${MYSTERY}/${NUMBER}.jpg/${VARIANT}";
  rosary = {
    Glorious: {
      days: ["Sunday", "Wednesday"],
      mysteries: [
        {
          path: "resurrection",
          name: "The Resurrection",
          meditation: '"He is not here; for He has been raised, as He said. Come, see the place where He lay."',
          images: 20,
        },
        {
          path: "ascension",
          name: "The Ascension",
          meditation:
            "When He had said this, as they were watching, He was lifted up, and a cloud took Him out of their sight. ",
          images: 18,
        },
        {
          path: "descent",
          name: "The Descent of the Holy Spirit",
          meditation:
            "Tongues of fire appeared and rested on each of them. All of them were filled with the Holy Spirit.",
          images: 33,
        },
        {
          path: "assumption",
          name: "The Assumption of Mary",
          meditation:
            '"From now on all generations will call me blessed; for the Mighty One has done great things for me."',
          images: 18,
        },
        {
          path: "coronation",
          name: "The Coronation of Mary",
          meditation:
            "A great portent appeared in heaven: a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars.",
          images: 33,
        },
      ],
    },
    Joyful: {
      days: ["Monday", "Saturday"],
      mysteries: [
        {
          path: "annunciation",
          name: "The Annunciation",
          meditation: '"Behold, I am the handmaid of the Lord; let it be to me according to your word."',
          images: 40,
        },
        {
          path: "visitation",
          name: "The Visitation",
          meditation: '"And why is this granted me, that the mother of my Lord should come to me?"',
          images: 32,
        },
        {
          path: "nativity",
          name: "The Nativity",
          meditation: "She gave birth to Jesus, wrapped Him in swaddling cloths, and laid Him in a manger.",
          images: 67,
        },
        {
          path: "presentation",
          name: "The Presentation",
          meditation: "They took Him to the temple in Jerusalem to present Him to the Lord.",
          images: 28,
        },
        {
          path: "finding",
          name: "The Finding of Jesus in the Temple",
          meditation: '"Why were you searching for me? Did you not know that I must be in my Father\'s house?"',
          images: 29,
        },
      ],
    },
    Sorrowful: {
      days: ["Tuesday", "Friday"],
      mysteries: [
        {
          path: "agony",
          name: "The Agony in the Garden",
          meditation: '"My Father, if it is possible, let this cup pass from Me; yet not as I will, but as You will."',
          images: 12,
        },
        {
          path: "scourging",
          name: "The Scourging at the Pillar",
          meditation: "Then Pilate took Jesus and scourged Him.",
          images: 19,
        },
        {
          path: "crowning",
          name: "The Crowning with Thorns",
          meditation: "And the soldiers twisted together a crown of thorns and put it on His head.",
          images: 25,
        },
        {
          path: "carrying",
          name: "The Carrying of the Cross",
          meditation: "And carrying the cross Himself, He went out to Golgotha, the Place of the Skull.",
          images: 14,
        },
        {
          path: "crucifixion",
          name: "The Crucifixion",
          meditation: '"Father, into your hands I commend My spirit."',
          images: 15,
        },
      ],
    },
    Luminous: {
      days: ["Thursday"],
      mysteries: [
        {
          path: "baptism",
          name: "The Baptism of Jesus in the River Jordan",
          meditation: '"This is My beloved Son, with whom I am well pleased."',
          images: 18,
        },
        {
          path: "wedding",
          name: "The Wedding Feast at Cana",
          meditation: 'Jesus said to them, "Fill the jars with water and take it to the chief steward."',
          images: 14,
        },
        {
          path: "proclamation",
          name: "The Proclamation of the Kingdom of God",
          meditation:
            '"You are the salt of the earth; but if the salt has become tasteless, how can it be made salty again?"',
          images: 11,
        },
        {
          path: "transfiguration",
          name: "The Transfiguration of Jesus",
          meditation:
            "And while he was praying, the appearance of his face changed, and his clothes became dazzling white.",
          images: 22,
        },
        {
          path: "institution",
          name: "The Institution of the Eucharist",
          meditation: '"This is my body, which is given for you. Do this in remembrance of me."',
          images: 26,
        },
      ],
    },
  };

  constructor() {
    this.today = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
  }

  getToday() {
    return this.today;
  }

  getTodaysCategory() {
    for (var i in this.rosary) {
      if (this.rosary[i].days.indexOf(this.today) !== -1) {
        return i;
      }
    }

    return "";
  }

  getThumbSource(category, mystery, number) {
    return this.imgUrlTemplate
      .replace("${CATEGORY}", category.toLowerCase())
      .replace("${MYSTERY}", mystery)
      .replace("${NUMBER}", number)
      .replace('${VARIANT}', 'f');
  }

  getCategories(categorySchedule) {
    if (!categorySchedule) {
      categorySchedule = {}
      for (var i in this.rosary) {
        categorySchedule[i] = this.rosary[i].days
      }
    }

    let categories = [],
      mystery;
    for (var i in this.rosary) {
      mystery = this.rosary[i].mysteries[randomNumber(0, 4)];
      categories.push({
        name: i,
        days: categorySchedule[i],
        src: this.getThumbSource(i, mystery.path, randomNumber(1, mystery.images)),
      });
    }

    return categories;
  }

  getFullSource(category, mystery, number) {
    return this.imgUrlTemplate
      .replace("${CATEGORY}", category.toLowerCase())
      .replace("${MYSTERY}", mystery)
      .replace("${NUMBER}", number)
      .replace('${VARIANT}', 'q');
  }

  getMysteries(category, cycle, names, meditations) {
    let mysteries = [],
      images,
      mystery,
      numbers,
      name,
      meditation;
    // Loop through each mystery.
    for (var i in this.rosary[category].mysteries) {
      images = [];
      mystery = this.rosary[category].mysteries[i];
      name = names ? mystery.name : "";
      meditation = meditations ? mystery.meditation : "";
      numbers = randomArrayOfLength(mystery.images);
      let iLength = cycle ? mystery.images : 1;
      // Loop through each image.
      for (let j = 0; j < iLength; j++) {
        images.push({
          src: this.getFullSource(category, mystery.path, numbers[j]),
          name: name,
          meditation: meditation,
        });
      }

      mysteries.push(images);
    }

    return mysteries;
  }
}

/*************************************************************************************************************/

function randomArrayOfLength(n) {
  // Create new empty array with length of (n + 1)
  let numbers = new Array(n + 1);
  // Create array from its keys (from 0 to n)
  numbers = Array.from(numbers.keys());
  // Remove the first element (value: 0). New array is values from 1 to n.
  numbers.shift();
  // Shuffle the array.
  return shuffle(numbers);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

function randomNumber(min, max) {
  var array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return parseInt(parseInt(array[0]) % parseInt(max - min + 1)) + parseInt(min);
}
