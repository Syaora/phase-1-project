# Phase 1 Project: NomNoms

## Project Requirements
 - Your app must be a HTML/CSS/JS frontend that accesses data from a public API. All interactions between the client and the API should be handled asynchronously and use JSON as the communication format.
 - Your entire app must run on a single page. There should be NO redirects. In other words, your project will contain a single HTML file.
 - Your app needs to incorporate at least 3 separate event listeners (DOMContentLoaded, click, change, submit, etc).
 - Some interactivity is required. This could be as simple as adding a "like" button or adding comments. These interactions do not need to persist after reloading the page.
 - Follow good coding practices. Keep your code DRY (Do not repeat yourself) by utilizing functions to abstract repetitive code.

## Introduction
This is a single page application project where I had to integrate a public API and previous experience up to this point. I wanted to create a website where I can search through recipes because I had a passion for cooking.

## Features
The features of the website is that a user would be able to search a recipe, like a recipe, see a list of their liked recipes, and view recipes.

## Setup
 - Run `npx json-server --watch db.json` to get the backend started
 - Open `index.html` file on browser

 ## Endpoints
 Endspoint for like feature
  - GET `/likes`
  - DELETE `/likes/:id`
  - POST `/likes`

## Stretch Goals
Being able to remove a recipe card from list of liked recipes after clicking the like button

## User Stories
 - As a user, I want to search recipes so that I can find a food to cook
 - As a user, I want to like a recipe so that I can refer back to the recipe
 - As a user, I want to see a list of liked recipes so that I can see which recipes are my favorites
 - As a user, I want to view recipe so that I can see what ingredients I need
 - As a user, I want to view a recipe so that I can see what the instructions for a recipe are.