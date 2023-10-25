import { _productsType_ } from "../../typeModel";

//event status code: 'upcoming' and 'past'
const products: _productsType_[] = [
  {
    id: "1",
    name: "Hp 15 Intel Core I3 15.6 4GB RAM/1TB HDD Win 10 - Black",
    price: 296490,
    units: 5,
    // contact: ["08052465145", "08060386628"],
    // status: "upcoming",
    description: `
      HP 15 laptop is a fine blend of user-friendly configuration, 
      powerful features and a compact design. Featuring stunning 
      visuals and powerful performance, this ultra-versatile and light 
      15.6- inch notebook is an upgrade on style and productivity that 
      will meet all your computing needs without putting a dent in your wallet. 
      The HP 15 comes in a compact size which makes it convenient to take home 
      from work or for that business presentation. For easy typing and pointing 
      purposes, it features a full-sized keyboard, so be active on the run, 
      rest assured that the HP 15 can keep up with the day's work.
    `,
    images: ["/images/shop/hp-pavillion.png"],
    createdAt: "2023-10-16 5:05:28",
    updatedAt: "2023-10-16 5:05:28"
  },
  {
    id: "2",
    name: "Hp 15 10th Gen Intel Core I3 (12GB,1TB HDD)Touchscreen Wins 10",
    price: 375000,
    units: 14,
    // contact: ["08052465145", "08060386628"],
    // status: "upcoming",
    description: `
      Processor: 10th Generation, Intel Core i3-10110U \n
      Memory: 12GB DDR4 SDRAM \n
      Storage: 1TB Hard Drive \n
      No Optical Drive \n
      Screen: 15.6" HD LED Display Touchscreen \n
      Operating System: Windows 10 \n
    `,
    images: ["/images/shop/hp-folio.png"],
    createdAt: "2023-10-16 5:05:28",
    updatedAt: "2023-10-16 5:05:28"
  },
  {
    id: "3",
    name: "Toshiba V15 Intel Core I3 8GB RAM 1TB HDD Wins 10 Pro +Free Led Lamp",
    price: 230000,
    units: 4,
    // contact: ["08052465145", "08060386628"],
    // status: "upcoming",
    description: `
      Processor Intel Core i3-10110U (2C / 4T, 2.1 / 4.1GHz, 4MB) \n
      Graphics Integrated Intel UHD Graphics \n
      Chipset Intel SoC Platform \n
      Memory 4GB Soldered DDR4-2666
    `,
    images: ["/images/shop/toshiba.png"],
    createdAt: "2023-10-16 5:05:28",
    updatedAt: "2023-10-16 5:05:28"
  },
  {
    id: "4",
    name: "Lenovo IdeaPad 3 15' - Intel Core I3 -1005G1- 8GB RAM 256GB SSD - Platinum Grey",
    price: 264000,
    units: 9,
    // contact: ["08052465145", "08060386628"],
    // status: "upcoming",
    description: `
      Windows 10 operating systemWindows 10 brings back the Start Menu from 
      Windows 7 and introduces new features, like the Edge Web browser that 
      lets you markup Web pages on your screen.
      15.6" Full HD display1920 x 1080 resolution with native 1080p support 
      to showcase your games and HD movies with impressive color and clarity.
    `,
    images: ["/images/shop/mi-laptop.png"],
    createdAt: "2023-10-16 5:05:28",
    updatedAt: "2023-10-16 5:05:28"
  },
  {
    id: "5",
    name: "Apple IPad Pro 12.9' M2(2022 Model)Wi-Fi+Cellular-512GB-Space Gray",
    price: 1250000,
    units: 1,
    // contact: ["08052465145", "08060386628"],
    // status: "upcoming",
    description: `
      Apple Pencil capabilities. Powerful new features in iPadOS 16. The ultimate iPad experience.
      The M2 chip is the next generation of Apple silicon, 
      with an 8‑core CPU that delivers up to 15 percent faster performance and 
      a 10‑core GPU that provides up to 35 percent faster graphics performance. 
      With a 40 percent faster Neural Engine to accelerate machine learning 
      tasks and 50 percent more memory bandwidth, M2 brings astonishing 
      performance and new capabilities to 
    `,
    images: ["/images/shop/ipad-pen-stand.png"],
    createdAt: "2023-10-16 5:05:28",
    updatedAt: "2023-10-16 5:05:28"
  },
  {
    id: "6",
    name: "Apple IPad 10th Gen 10.9' Wi-Fi + Cellular 64GB - Blue - 2022 Model",
    price: 625999,
    units: 6,
    // contact: ["08052465145", "08060386628"],
    // status: "upcoming",
    description: `
      The all-new and redesigned iPad is more capable and intuitive than ever before. 
      With superfast wireless connectivity, an improved new all-screen design and a 
      variety of features. You get powerful 12MP wide angled cameras and a 
      multi-touch display with IPS technology. This iPad is equipped for superfast 
      Wi-Fi and cellular connectivity.
    `,
    images: ["/images/shop/ipad-frontView.png"],
    createdAt: "2023-10-16 5:05:28",
    updatedAt: "2023-10-16 5:05:28"
  },
  {
    id: "7",
    name: "Apple IPad 9th Gen - 10.2 - Wi-Fi Only - 256GB - Silver - 2021",
    price: 499999,
    units: 3,
    // contact: ["08052465145", "08060386628"],
    // status: "upcoming",
    description: `
      Powered by a A13 Bionic chip, iPad makes multitasking easier than ever. 
      Sketch out your latest masterpiece with your 1st generation Apple Pencil 
      (sold separately), switch between apps and stream shows. 
      All without being slowed down.
    `,
    images: ["/images/shop/ipad-bothside.png"],
    createdAt: "2023-10-16 5:05:28",
    updatedAt: "2023-10-16 5:05:28"
  },
  {
    id: "8",
    name: "Sony Xiaoxin Pad 10.6 Inch 2022 WiFi Tablet, 6GB+128GB Android 12",
    price: 172996,
    units: 5,
    // contact: ["08052465145", "08060386628"],
    // status: "upcoming",
    description: `
      1. ZUI 13.5 (Android 12) operating system \n
      2. Qualcomm Snapdragon 680 octa-core CPU \n
      3. 6GB RAM + 128GB ROM \n
      4. 10.6-inch TDDI LCD screen, 2000x1200 resolution \n
      5. Support 2.4GHz/5GHz WiFi and Bluetooth 5.1 \n
      6. Support face recognition, Dolby panoramic sound, GPS+Beidou \n
      7. Powered by 7700mAh lithium battery, support QC3.0 fast charge \n
      8. 8MP rear camera + 8MP front camera \n
      9. Features: multiple eye protection modes, learning assistant, split-screen display
    `,
    images: ["/images/shop/sony-tablet.png"],
    createdAt: "2023-10-16 5:05:28",
    updatedAt: "2023-10-16 5:05:28"
  },
];

export default products;
