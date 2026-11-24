# ImportNow – China to India Importing Platform

A modern, interactive website replicating the [ImportNow reference website](https://importnow-concept.vercel.app/#home), designed to showcase China-to-India import services through an engaging user experience, interactive sections, and immersive 3D animations.

**Live Website:** [Add your Netlify deployment link]

**Reference Website:** https://importnow-concept.vercel.app/#home

---

## Project Overview

This project was developed as part of a website replication assignment. The objective was to recreate the design, layout, interactions, and overall user experience of the provided reference website using AI-assisted development tools.

In addition to replicating the original website, two independent Three.js animations were developed and integrated into the landing page to visually represent the international shipping and import process.

## Key Features

- Responsive website layout inspired by the original ImportNow website.
- Interactive navigation bar and hero section.
- Dedicated sections explaining the end-to-end import process.
- China sourcing hubs and import service information.
- Business trips to China and officially registered business information.
- Recently delivered shipments and import guides.
- Interactive cards, hover effects, and subtle animations.
- FAQ section and contact-related information.
- Two custom Three.js animations integrated into the landing page.

## 3D Animations

Two separate 3D animations were created using Three.js to enhance the visual storytelling of the website.

### 1. Interactive 3D Earth Globe – China to India Shipping Route

A realistic 3D Earth globe illustrating the shipping connection between China and India.

**Features:**
- Realistic Earth using diffuse, bump, and specular textures.
- Geographic markers for Shanghai, China, and Mumbai, India.
- Animated shipping route connecting Shanghai to Mumbai.
- Curved shipping arc above the Earth's surface.
- Glowing ship moving along the shipping route in a continuous loop.
- Slowly oscillating globe rotation.
- Atmospheric glow, lighting, clouds, and star background.
- Mouse-based interaction to influence globe rotation.

**Development Prompt:**

> Create a realistic 3D Earth globe using Three.js as a standalone, reusable component.
>
> Include realistic Earth textures (diffuse, bump, and specular), atmospheric lighting, clouds, and a star background. Add geographic markers for Shanghai, China, and Mumbai, India.
>
> Visualize an international shipping route between these two locations using a curved arc above the Earth's surface. Add a glowing cargo ship that travels along the route continuously.
>
> Implement slow, smooth globe rotation with the camera initially positioned to face Asia. The globe should respond subtly to mouse movement across the hero section rather than behaving like a freely draggable 3D object.
>
> Keep the animation modular and independent of the website's existing layout and CSS so it can be integrated into the main website later.

### 2. Scroll-Controlled 3D Cargo Shipping Animation

A Three.js-powered 3D shipping scene that visually represents the movement of cargo from a Chinese port to an Indian port.

The animation progresses as the user scrolls through the designated website section, creating a visual storytelling experience.

**Features:**
- 3D cargo ship with multiple shipping containers.
- Port environments representing China and India.
- Cargo cranes and container-loading sequences.
- Water surface with reflections and lighting effects.
- Shadows, atmospheric fog, and realistic scene lighting.
- Scroll-controlled camera movement and scene transitions.
- Animated cargo-loading and shipping sequences.
- Shipment progress indicators and step-based information cards.

**Development Prompt:**

> Create a cinematic 3D cargo shipping animation using Three.js that is controlled by the user's scroll position.
>
> Build a detailed port environment with cargo ships, multiple shipping containers, loading cranes, water, realistic lighting, shadows, and reflections.
>
> The animation should visually demonstrate the complete shipping journey:
>
> 1. Cargo preparation at a Chinese factory.
> 2. Sample collection and verification.
> 3. Containers being loaded onto a cargo ship at a Chinese port.
> 4. The cargo ship sailing across the ocean.
> 5. Arrival and customs clearance at an Indian port.
> 6. Final delivery of the shipment.
>
> Synchronize camera movement, object animations, and scene transitions with the user's scroll position to create a smooth, cinematic experience similar to the provided reference recording.
>
> Integrate shipment progress indicators and step-based information cards that update as the animation progresses.
>
> The animation should be modular and designed to fit naturally within the existing website's layout.

## AI-Assisted Development Workflow

The project was developed using multiple AI tools, with each tool serving a specific purpose.

| Tool | Purpose |
|---|---|
| Lovable AI | Created the two standalone Three.js animations. |
| Google Gemini | Used the reference website and assignment requirements to generate the main website replica and integrate both animations into appropriate sections. |
| GitHub Copilot | Assisted with debugging, refining code, and implementing UI and functionality fixes in Visual Studio Code. |
| Visual Studio Code | Used for source-code inspection, editing, local testing, and development. |
| Netlify | Used to deploy and host the completed website. |

### Development Process

**Step 1 – Animation Development**

Used Lovable AI to independently generate two Three.js animations:

- A realistic Earth globe showing the China-to-India shipping route.
- A scroll-controlled 3D cargo shipping animation.

Developing them separately helped maintain modularity and made integration into the website easier.

**Step 2 – Website Replication**

Provided Google Gemini with the original reference website URL, assignment requirements, and the two animation implementations.

Used the following prompt:

> Replicate the complete website from the provided reference URL: https://importnow-concept.vercel.app/#home.
>
> Recreate the website's overall layout, visual design, typography, navigation, sections, interactions, hover effects, and responsive behaviour as closely as possible.
>
> Integrate the two previously developed Three.js animations into appropriate sections of the website:
>
> - Place the interactive Earth globe in the hero section.
> - Integrate the scroll-controlled cargo shipping animation into the How It Works section.
>
> Ensure that both animations fit naturally into the original website's design without affecting the existing layout, spacing, or responsiveness.
>
> Prioritize visual accuracy, smooth animations, functional interactions, and consistency with the reference website.

**Step 3 – Refinement and Improvements**

After generating the initial website, downloaded the source code and opened it in Visual Studio Code.

Used GitHub Copilot to identify and fix differences between the replicated website and the original reference.

The refinements included:

- Adjusting navbar width, margins, and section alignment.
- Improving hero-section globe rotation and mouse interactions.
- Adding subtle cursor-following shadows to interactive cards.
- Improving the How It Works animation to support multiple containers, loading, and unloading sequences.
- Restoring missing country flags, icons, and decorative elements.
- Refining hover effects, card shadows, and transitions.
- Correcting the alignment of the FAQ section.
- Improving the appearance and hover interactions of business licences.
- Adjusting typography, spacing, and visual details throughout the website.
- Refining the ImportNow logo to better match the original design.

**Step 4 – Testing and Deployment**

Tested the website locally, verified the animations and interactions, and deployed the completed project using Netlify.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Three.js
- AI-assisted development tools
- GitHub
- Netlify

## Running the Project Locally

You can run the project locally using Visual Studio Code and the Live Server extension.

**Prerequisites:**
- Visual Studio Code
- Google Chrome or another modern browser
- Live Server extension

**Steps:**

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd YOUR_PROJECT_FOLDER
   ```

3. Open the folder in Visual Studio Code:

   ```bash
   code .
   ```

4. Install the Live Server extension in VS Code.

5. Open `index.html`, right-click, and select **Open with Live Server**.

6. The website will open in your browser, usually at:

   ```text
   http://127.0.0.1:5500
   ```

**Note:** If the project uses ES modules or locally imported Three.js dependencies, make sure the required dependencies and asset paths are configured correctly. Live Server serves the files locally and avoids browser restrictions associated with opening HTML files directly using `file://`.

## Deployment

The website is deployed using Netlify.

**Live Website:** [Add your Netlify URL]

## Assignment Deliverables

- Live website deployment.
- Complete source code and GitHub repository.
- Two custom Three.js animations.
- Explanation of AI tools and development workflow.

---

**Project Goal:** To demonstrate effective use of AI-assisted development tools, understanding of generated code, problem-solving, frontend development, 3D animation integration, and the ability to refine and deliver a functional website based on an existing reference.