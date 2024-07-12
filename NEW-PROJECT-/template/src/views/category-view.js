// views/category-view.js

export const toCategoriesView = (categories) => `
<div id="categories">
    <h1>Categories</h1>
    <div class="content">
    ${categories.map(category => `
        <div class="category" data-category-id="${category.id}">
        <img src="${category.gif.images.fixed_height.url}" alt="${category.name}">
        <p>${category.name}</p>
        </div>
    `).join('')}
    </div>
</div>
`;
