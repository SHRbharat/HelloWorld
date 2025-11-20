---
title: "Introduction to Docker for Developers"
date: "2024-10-10"
author: "Shivam Ray"
excerpt: "Learn the basics of containerization and how to dockerize your web applications for consistent deployment."
coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80"
tags: [docker, devops, containers]
---

Docker helps package applications into portable containers. This guide covers Dockerfiles, images, containers, and a basic workflow for building and running apps.

### Quick start

1. Write a small `Dockerfile`.
2. Build with `docker build -t myapp .`.
3. Run with `docker run -p 3000:3000 myapp`.
