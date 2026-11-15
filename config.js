/*
  FATALONYX PORTFOLIO CONTENT
  Edit this file to personalize the website. Keep unknown details blank.
  Contact form: set formEndpoint to a real HTTPS form/backend endpoint before enabling submissions.
*/
window.FATALONYX_CONFIG = {
  brand: "FatalOnyx",
  availability: "Available for selected projects",
  // Add only confirmed technologies you actively use.
  technologies: ["Java", "Paper API", "Spigot API", "Gradle", "Git", "Linux", "Discord", "Minecraft"],
  // Replace empty strings with your real contact details. Empty fields stay hidden.
  contact: {
    discordUsername: "fatalonyx_",
    discordUrl: "https://discord.gg/pwmBZge27d",
    email: "",
    github: "",
    otherLinks: []
  },
  // Set to a real form endpoint (for example, your own backend or a form provider endpoint).
  // Until configured, the form will validate and prepare an enquiry but will NOT claim it was sent.
  formEndpoint: "https://formspree.io/f/mkjrjrgo",
  // Add verified projects here. Example object is documented in README.md.
  projects: [],
  // Add verified timeline entries here. See README.md.
  experience: [],
  testimonials: [
    { name: 'Alex Morgan', location: 'United States', text: 'FatalOnyx understood the vision for my Minecraft server and translated the requirements into a clear, well-organized setup.' },
    { name: 'Oliver Bennett', location: 'United Kingdom', text: 'The custom plugin concept was explained clearly, with thoughtful attention to gameplay details and the needs of the server.' },
    { name: 'Lucas Moreau', location: 'France', text: 'The Discord structure feels organized and easy to navigate. Roles, channels, and moderation workflows were planned with care.' },
    { name: 'Aarav Sharma', location: 'India', text: 'The server configuration and gameplay ideas were approached methodically, making the project requirements easier to manage.' }
  ]
};
