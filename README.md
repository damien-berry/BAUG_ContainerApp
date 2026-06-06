# Azure Container Apps as the AI Agent Runtime
**Useful Pattern or Build Demo Hype?**

A Brisbane Azure User Group presentation exploring Microsoft's Build 2026 announcement of Azure Container Apps Sandboxes and the emerging concept of an AI-native runtime.

## Presentation Website
[https://damien-berry.github.io/BAUG_ContainerApp/](https://damien-berry.github.io/BAUG_ContainerApp/)

## Session Summary
At Microsoft Build 2026, Microsoft presented a vision where AI agents move beyond simple chat interactions and become long-running, stateful workloads capable of:

- Executing code
- Accessing enterprise systems
- Using connectors and tools
- Maintaining state
- Operating within secure execution environments

The session introduced **Azure Container Apps Sandboxes**, a new runtime model designed to provide:

- Isolated execution
- Session management
- Snapshots and state persistence
- Connector inheritance
- Egress controls
- Identity-aware workloads

This presentation reviews the Build session, examines the supporting documentation, and explores where these capabilities may fit within real-world enterprise architecture.

## Topics Covered

- Why agent projects fail
- Runtime challenges for AI workloads
- Azure Container Apps Sandboxes
- Session Groups and Connectors
- Snapshots and State Management
- Egress Policies
- Identity and Trust Boundaries
- Where Sandboxes fit (and where they don't)

## Key Question

> Are Azure Container Apps Sandboxes simply another way to run containers, or are they the beginning of a new runtime category designed specifically for agent workloads?

## Repository Structure

```
docs/
├── index.html                 Presentation site
├── app.js                     Navigation and slide logic
├── styles.css                 Presentation styling
├── Img/                       Presentation images
├── Vid/                       Demo clips
└── presentation-thinking.md   Narrative and research
```

## Resources

- Microsoft Build BRK221
- Azure Container Apps Sandboxes Documentation
- Azure Container Apps Snapshots and State Management
- Azure Container Apps Egress Policies
- Microsoft Graph
- Microsoft Entra ID

## Author
Damien Berry

Brisbane Azure User Group
