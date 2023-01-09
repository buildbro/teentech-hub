const events = [
  {
    title: "Summer Bootcamp `22",
    date: "15th August - 20th August",
    time: "9AM Everyday",
    link: "",
    venue:
      "Opposite Evangelical Nursery and Primary School, Lobi Quaters, Old GRA, Makurdi.",
    contact: ["08052465145", "08060386628"],
    status: "past",
    description:
      "Enroll your kids in a free summer bootcamp. Where they can learn variouse skills using softwares like Scratch and also some basic programming language experience with HTML and Python.",
  },
  {
    title: "TIVID Orphanage Code Camp for Children's day 2020",
    date: "Children's day 2020",
    time: "",
    link: "",
    venue:
      "Opposite Evangelical Nursery and Primary School, Lobi Quaters, Old GRA, Makurdi.",
    contact: [],
    status: "past",
    description: "",
  },
  {
    title: "Children's Day 2022 - Children of Mary Orphanage, Otukpo",
    date: "Children's day 2022",
    time: "",
    link: "",
    venue: "Children of Mary Orphanage, Otukpo",
    contact: [],
    status: "past",
    description: "",
  },
  {
    title: "Children's Day 2022 - Government College, Makurdi",
    date: "Children's day 2022",
    time: "",
    link: "",
    venue: "Government College, Makurdi",
    contact: [],
    status: "past",
    description: "",
  },
];

export default async (req: any, res: any) => {
  res.send(JSON.stringify(events));
};
