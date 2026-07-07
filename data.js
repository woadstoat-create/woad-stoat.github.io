/*
  ============================================================
  SITE DATA — this is the only file you need to edit to add,
  remove, or change content on the site.
  ============================================================

  HOW TO ADD A PROJECT
  ---------------------
  Copy one of the objects inside the `projects` array below,
  paste it in as a new entry, and change the values.

  Fields:
    title       - Project name (string)
    tag         - One short category. Used to build the filter
                  chips automatically. Reuse an existing tag
                  (e.g. "Shipped", "Academic") to group projects,
                  or invent a new one — a new filter chip will
                  appear automatically.
    description - 1-3 sentences. Keep it tight.
    image       - Filename of the image, sitting in the same
                  folder as index.html (or a full URL).
    link        - Where the card should go when clicked.
    linkLabel   - Text on the card's link, e.g. "View on Steam",
                  "View on GitHub", "Play on itch.io".

  To reorder projects, just reorder the objects in the array.
  To remove a project, delete its object.
*/

const SITE_DATA = {

  // ---------------------------------------------------------
  // PROFILE — headline info, bio, and contact details
  // ---------------------------------------------------------
  profile: {
    name: "Calum Mathison",
    roles: ["Game Developer", "Software Engineer", "Computing Lecturer"],
    tagline: "Building systems that make games feel alive — from shipped narrative titles to procedural generation research.",

    bio: `I’m a software and game developer with over six years of combined industry and academic 
    experience across programming, technical design, and education. I recently worked as a Technical 
    Designer on MindsEye, implementing gameplay systems and scripting within a collaborative production 
    environment. I have also lectured in Software Engineering and Game Development at Edinburgh College, 
    teaching programming, game design, ethics, development workflows, and project management.`,

    skills: [
      "C#", "C++", "Lua", "Python", "JavaScript",
      "Unity", "Unreal Engine", "MonoGame", "SFML",
      "Procedural Generation", "Gameplay Scripting", "Software Development", "Technical Design"
    ],

    location: "Edinburgh, Scotland",
    email: "woadstoat@gmail.com",
    phone: "07340 980 540",
    linkedin: "https://www.linkedin.com/in/calummathison/",
    github: "https://github.com/woadstoat-create",
    resumeUrl: "Calum_Mathison_Resume.pdf",
    photo: "ProfilePic.jpg"
  },

  projects: [
    {
        title: "MindsEye",
        tag: "Shipped",
        description: "Narrative-driven, single-player action-thriller set in the fictional desert city of Redrock. Worked as Technical Designer, implementing gameplay systems and scripting in a collaborative production environment.",
        image: "MindsEye.jpg",
        link: "https://store.steampowered.com/app/3265250/MindsEye/",
        linkLabel: "View on Steam"
    },
    {
        title: "L-System Dungeons",
        tag: "Academic",
        description: "Dissertation project using Lindenmayer systems to generate procedural 2D dungeons.",
        image: "DissertationScreenshot.png",
        link: "https://github.com/CalumMathison/L-SystemDungeons",
        linkLabel: "View on GitHub"
    },
    {
        title: "Further L-System Work",
        tag: "Tools",
        description: "Customizable console application using Python's turtle module to recreate Lindenmayer's original concepts, including Koch curves and simple plant shapes.",
        image: "L-System Collage.png",
        link: "https://github.com/CalumMathison/L-Systems",
        linkLabel: "View on GitHub"
    },
    {
        title: "WoadStoat.MarkovNames",
        tag: "Tools",
        description: "A C# library for generating random names using Markov chains, with a simple console application for testing.",
        image: "MarkovChain.png",
        link: "https://github.com/woadstoat-create/WoadStoat.MarkovNames",
        linkLabel: "View on GitHub"
    },
    {
        title: "Data Structures & Algorithms",
        tag: "Academic",
        description: "A collection of implementations for various data structures and algorithms in C++, created for teaching.",
        image: "DataStructures.png",
        link: "https://github.com/CalumMathison/AbstractDataMaterials",
        linkLabel: "View on GitHub"
    },
    {
        title: "Boids Algorithm 2D & 3D",
        tag: "Academic",
        description: "Advanced Games Engineering project implementing Craig Reynolds' flocking simulation algorithm in both 2D and 3D.",
        image: "BoidsScreenshot.png",
        link: "",
        linkLabel: ""
    },
    {
        title: "Raptor Rush",
        tag: "Shipped",
        description: "A 2D endless runner game built using a custom MonoGame engine and released on itch.io.",
        image: "RaptorRush.png",
        link: "https://woadstoat.itch.io/raptorrush",
        linkLabel: "Play on itch.io"
    },
    {
      title: "Fantasy & Ash",
      tag: "Academic",
      description: "Games Engineering project — a JRPG built as a pair using a custom SFML engine.",
      image: "RPGScreenshot.png",
      link: "https://arran-d-smedley.itch.io/fantasy-ash",
      linkLabel: ""
    },
    {
      title: "Clock Solitaire",
      tag: "Shipped",
      description: "Solitaire game built using the MonoGame framework and released on itch.io.",
      image: "Clocks.png",
      link: "https://woadstoat.itch.io/clock-solitaire",
      linkLabel: "Play on itch.io"
    },
    {
      title: "Creative Writing",
      tag: "Writing",
      description: "A portfolio of short creative writing pieces.",
      image: "CreativeWriting.jpg",
      link: "https://blog.reedsy.com/creative-writing-prompts/author/calum-mathison/",
      linkLabel: "Read on Reedsy"
    },
    {
        title: "AI-integrated Discord/Twitter Bot",
        tag: "AI",
        description: "A Discord & Twitter (X) bot that uses OpenAI's GPT-4 to generate responses to user prompts.",
        image: "DiscordBot.png",
        link: "https://github.com/WoadStoatStudio/DiscordBot"
    },
    {
        title: "AI-integrated Assistant and Chatbot",
        tag: "AI",
        description: "An AI assistant dashboard and chatbot that utilising OpenAI, Anthropic and X API's.",
        image: "Ophelia.PNG",
        link: "https://github.com/woadstoat-create/Ophellia"
    }
  ]
};