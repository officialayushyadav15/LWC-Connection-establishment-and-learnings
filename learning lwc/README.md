## Lightning Web Components – Core Concepts

This repository covers the foundational concepts of Lightning Web Components (LWC). The code here focuses on how components are created, named, structured, and how data flows and renders dynamically in the UI.

The goal of this repo is simple: understand how LWC works at its core, without shortcuts or magic.

---

## What is a Lightning Web Component

A Lightning Web Component is a reusable UI unit in Salesforce. Each component lives in its own folder and is built using:

* JavaScript for logic and data handling
* HTML for UI rendering
* XML configuration to control where the component can be used

Each component is self-contained and follows strict rules so Salesforce can register and render it correctly.

---

## Component Naming Rules

LWC enforces strict naming conventions. These are not optional.

Rules:

* Must start with a lowercase letter
* Can contain only letters, numbers, or underscores
* Must be unique in the namespace
* No spaces
* No hyphens
* Cannot end with an underscore
* Cannot contain consecutive underscores

Valid example:

```
helloWorld
```

Invalid examples:

```
HelloWorld
hello-world
hello__world
hello world
```

These rules apply to both the folder name and the default files inside it.

---

## Creating an LWC Component

Components can be created in two ways.

### Using the Terminal

```
sfdx force:lightning:component:create --type lwc -n helloWorld
```

This creates a new component inside the `lwc` folder.

### Using VS Code Command Palette

Steps:

1. Open VS Code
2. Open Command Palette
3. Select **Create Lightning Web Component**
4. Enter the component name
5. Select the default path

This approach is beginner-friendly and avoids naming mistakes.

---

## Component Folder Structure

Each LWC lives inside its own folder.

```
helloWorld
│
├── helloWorld.html
├── helloWorld.js
├── helloWorld.js-meta.xml
├── helloWorld.css
├── helloWorld.svg
├── moreSharedCode.js
└── __tests__
    └── helloWorld.test.js
```

### Required Files

These files must exist and must match the component name:

* `component.html`
* `component.js`
* `component.js-meta.xml`

Only one of each is allowed.

### Optional Files

* Additional JavaScript helper files
* CSS for styling
* SVG for icons
* Jest test files inside `__tests__`

---

## Naming Styles Used in LWC

| Style      | Example     | Usage                      |
| ---------- | ----------- | -------------------------- |
| camelCase  | helloWorld  | Component folder and files |
| PascalCase | HelloWorld  | JavaScript class name      |
| kebab-case | hello-world | Component usage in HTML    |

Example usage:

```
<c-hello-world></c-hello-world>
```

---

## Making Components Visible in Salesforce

To use a component in the App Builder, it must be exposed.

Inside `js-meta.xml`:

```
<isExposed>true</isExposed>
```

Once exposed:

* Create or open a Lightning App or Page
* Drag the component into the layout

---

## Deploying Components

To deploy all local metadata to Salesforce:

```
sf project deploy start
```

This pushes the entire project to the org.

---

## Data Binding in LWC

Data binding connects JavaScript and HTML.

### One-Way Data Binding

Data flows from JavaScript to HTML.

JavaScript:

```
fullname = "Salesforce Troop";
```

HTML:

```
My Full Name is {fullname}
```

When the value changes in JavaScript, the UI updates automatically.

---

## Template Rules You Must Follow

* Only properties and getters are allowed in templates
* No calculations inside HTML
* No array indexing inside HTML
* No spaces inside `{}`

Valid:

```
{name}
{user.name}
```

Invalid:

```
{2 + 2}
{names[0]}
{ data }
```

All logic belongs in JavaScript.

---

## Two-Way Data Binding

Two-way binding allows data to move:

* From JavaScript to HTML
* From HTML back to JavaScript using events

JavaScript:

```
fullnameis = "Ayush Yadav";
title = "LWC";

changeHandler(event) {
    this.title = event.target.value;
}
```

HTML:

```
<lightning-input type="text" label="Enter Course name" onkeyup={changeHandler}></lightning-input>
<div>{fullnameis} is learning {title} in salesforce</div>
```

---

## Tracking Objects with @track

By default, LWC tracks only top-level property changes.

For objects and arrays, nested changes require `@track`.

JavaScript:

```
import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track address = {
        city: "Hyderabad",
        state: "Telangana",
        country: "India"
    };

    trackchangeHandler(event) {
        this.address.city = event.target.value;
    }
}
```

HTML:

```
<lightning-input type="text" label="Enter city" onkeyup={trackchangeHandler}></lightning-input>
<div>{address.city} is my city</div>
```

---

## Getters in LWC

Getters are used to prepare or calculate data for the template.

HTML cannot run logic, so getters handle it cleanly.

JavaScript:

```
users = ["Ayush", "Yadav", "Salesforce"];
n1 = 10;
n2 = 20;

get firstuser() {
    return this.users[0].toUpperCase();
}

get multi() {
    return this.n1 * this.n2;
}
```

HTML:

```
<div>First user name is {firstuser}</div>
<div>Multiplication result is {multi}</div>
```

Getters auto-update when dependent data changes.

---

## Conditional Rendering

Conditional rendering controls whether elements exist in the DOM.

LWC provides:

* `if:true`
* `if:false`

JavaScript:

```
isVisible = false;
name;

handleClick() {
    this.isVisible = !this.isVisible;
}

changeHandler(event) {
    this.name = event.target.value;
}

get helloMethod() {
    return this.name === "hello";
}
```

HTML:

```
<template if:true={isVisible}>
    <div>Welcome I am Ayush Yadav Learning LWC</div>
</template>

<template if:false={isVisible}>
    <div>Data is hidden</div>
</template>

<template if:true={helloMethod}>
    <div>Your answer is right</div>
</template>
```

Conditions must always come from properties or getters.

---

## Template Looping

Looping is used to render repeated data without duplicating HTML.

### for:each Loop

JavaScript:

```
cars = ["audi", "bmw", "maruti", "honda", "tata"];
```

HTML:

```
<template for:each={cars} for:item="car">
    <ul key={car}>
        <li>{car}</li>
    </ul>
</template>
```

Each looped element must have a unique `key`.

---

## iterator Loop

Used when you need first or last item control.

JavaScript:

```
ceoList = [
    { id: 1, name: "Ayush", city: "Hyderabad" },
    { id: 2, name: "Yadav", city: "Delhi" },
    { id: 3, name: "Salesforce", city: "Bangalore" }
];
```

HTML:

```
<template iterator:ceo={ceoList}>
    <div key={ceo.value.id}>
        <div if:true={ceo.first}><strong>List of people and cities</strong></div>
        <p>{ceo.value.city} : {ceo.value.name}</p>
        <div if:true={ceo.last}><strong>Thanks for visiting</strong></div>
    </div>
</template>
```

---

## References

* Lightning Component Library
* Lightning Design System

---

This repository is meant to build strong fundamentals. Each concept here shows how LWC behaves under the hood and how to write clean, predictable components.

---

## Salesforce DX Project – Next Steps

Once the Salesforce DX project is created, the next step is understanding how this code moves between your local machine and Salesforce, and how the project itself is configured.

This repository follows standard Salesforce DX structure and workflows.

---

### How You Plan to Deploy Changes

Before deploying, it helps to be clear about the development model you are using.

You generally choose between:

* Deploying a specific set of changes to an org
* Building a self-contained application that can be moved across orgs

Salesforce DX supports multiple development models depending on team size, release flow, and org strategy.

---

### Salesforce DX Project Configuration

The `sfdx-project.json` file controls how your project behaves.

It defines:

* Package directories
* API version
* Namespace settings
* Project metadata structure

This file is central to how Salesforce CLI understands your project.

---
## How Do You Plan to Deploy Your Changes?

Do you want to deploy a set of changes, or create a self-contained application? Choose a [development model](https://developer.salesforce.com/tools/vscode/en/user-guide/development-models).

## Configure Your Salesforce DX Project

The `sfdx-project.json` file contains useful configuration information for your project. See [Salesforce DX Project Configuration](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_config.htm) in the _Salesforce DX Developer Guide_ for details about this file.

## Read All About It

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
