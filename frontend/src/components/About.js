import React from "react";

const About = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05060a",
        color: "white",
        fontFamily: "Inter, sans-serif",
        paddingTop: "120px",
        paddingBottom: "80px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {/* Hero */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "20px",
            background: "linear-gradient(45deg,#a855f7,#ec4899,#3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About PromptHub
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.7)",
            lineHeight: "1.7",
          }}
        >
          PromptHub is a platform where creators, developers, and AI enthusiasts
          can discover and share powerful prompts for AI tools. Our goal is to
          make AI easier to use by providing ready-to-use prompts that help
          people generate content faster and better.
        </p>
      </div>

      {/* Features */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "80px auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "30px",
        }}
      >
        {features.map((f, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              padding: "30px",
              transition: "0.3s",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                marginBottom: "12px",
              }}
            >
              {f.icon}
            </div>

            <h3
              style={{
                fontSize: "20px",
                marginBottom: "10px",
                fontWeight: "600",
              }}
            >
              {f.title}
            </h3>

            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "15px",
                lineHeight: "1.6",
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Creator */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          Built with passion
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            lineHeight: "1.7",
          }}
        >
          PromptHub was created by <strong>Lucky Gole</strong>, a full-stack web
          developer passionate about building modern web applications and AI
          tools. The vision behind PromptHub is to create a simple and powerful
          hub where people can easily access the best prompts for AI platforms
          like ChatGPT, Gemini, and more.
        </p>

        <div
          style={{
            marginTop: "30px",
            padding: "15px 30px",
            display: "inline-block",
            borderRadius: "12px",
            background: "rgba(168,85,247,0.15)",
            border: "1px solid rgba(168,85,247,0.3)",
            fontWeight: "600",
          }}
        >
          Made with ❤️ in India
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: "⚡",
    title: "Instant Prompts",
    desc: "Access ready-to-use prompts for AI tools instantly and save hours of work.",
  },
  {
    icon: "🤖",
    title: "AI Friendly",
    desc: "Optimized prompts designed specifically for modern AI models.",
  },
  {
    icon: "🌍",
    title: "Community Driven",
    desc: "Prompts created and shared by developers, creators, and AI enthusiasts.",
  },
];

export default About;