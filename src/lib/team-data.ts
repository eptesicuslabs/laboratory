export interface TeamMember {
    slug: string;
    name: string;
    role: string;
    bio: string;
    stack: string[];
    narrative: string;
    image?: string;
    socials: {
        github?: string;
        twitter?: string;
        linkedin?: string;
        instagram?: string;
        email?: string;
        website?: string;
    };
}

export const TEAM_MEMBERS: Record<string, TeamMember> = {
    "deyan-todorov": {
        slug: "deyan-todorov",
        name: "Deyan Todorov",
        role: "Founder & Researcher",
        bio: "Researching efficient neural architectures that outperform transformers at a fraction of the compute. Building open-source AI tooling for local-first development workflows.",
        stack: ["Neural Architecture Design", "Rust", "PyTorch", "Systems Architecture"],
        narrative: "The path forward isn't bigger models — it's smarter architectures. We're proving that unified designs combining linear attention, state-space models, and latent attention can deliver more capability per compute than conventional transformers.",
        image: "/images/team/deyan-todorov.jpg",
        socials: {
            github: "https://github.com/dttdrv",
            email: "mailto:deyan.todorov21@gmail.com",
            website: "https://dttdrv.xyz"
        }
    },
    "iliyan-bozhanov": {
        slug: "iliyan-bozhanov",
        name: "Iliyan Bozhanov",
        role: "Co-Founder",
        bio: "Architecting the distributed systems and tooling infrastructure that powers Eptesicus research and open-source projects.",
        stack: ["Distributed Systems", "Cryptography", "Model Optimization", "Python"],
        narrative: "Building the infrastructure that lets small, efficient models prove they can punch above their weight class through rigorous engineering and open-source collaboration.",
        image: "/images/team/iliyan-bozhanov.jpg",
        socials: {
            instagram: "https://www.instagram.com/iliyan_bozhanov",
            email: "mailto:libojanov@gmail.com"
        }
    }
};
