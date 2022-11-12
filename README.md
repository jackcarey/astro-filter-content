# astro-filter-content

Adds 3 components for client-side DOM filtering of page content.

These components are for adding CSS styles to the head of a document, control `input`s, and an inline component.

## Installation

```
npm i @jackcarey/astro-filter-content
```

## Usage

### 1. Astro Config

Inside `src/config.ts` add:

```
export const FILTER_OPTIONS = {
	label: "Levels",
	prefix: "Level",
	multiple: false,
	items: ["foo","bar","fizz"]
};
```

Where the following options can be changed:

- **label** - The plural label of your filter items.
- **prefix** - Optional. The singular label for your items that will be prefixed before each list entry.
- **multiple** - Boolean. Whether multiple items can be selected or not.
- **items** - An ordered array of strings for each item a user can filter against.

### 2. Document `<head>`

In the frontmatter of the layout, add:

```
import FilterContentHead from "@jackcarey/astro-filter-content";
```

Before the closing head tag, add:

```
<FilterContentHead/>
```

This adds the necessary styles and scripts for filtering the DOM.

### 3. Filter Controls

Add the snippet below where you would like your filter controls to appear. A useful location might be in a sidebar or next to a dark mode button.

In frontmatter:
```
import FilterContentControl from "@jackcarey/astro-filter-content/>"
```

In HTML document/layout content:
```
<FilterContentControl/>
```

### 4. Filtering Content

In the frontmatter of the layout, add:
```
import FilterContent from "@jackcarey/astro-filter-content";
```

Where you would like content to be filterable, wrap it in the component:

```
<FilterContent options = "foo">
This is foo content.
<FilterContent/>

<FilterContent options = "bar">
This is bar content.
<FilterContent/>

<FilterContent options = "fizz">
This is fizz content.
<FilterContent/>

<FilterContent options = "bar, foo">
This is bar OR foo content.
<FilterContent/>
```
