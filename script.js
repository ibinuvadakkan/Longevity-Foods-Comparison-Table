// Longevity Foods Table JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Food data
    const foodData = [
        {
            name: "Beans/Legumes",
            benefits: "Reduce death risk by 8% per 20g daily",
            amount: "4+ servings/week",
            ways: ["Breakfast scrambles", "Soups", "Salads"]
        },
        {
            name: "Whole Grains",
            benefits: "17% lower mortality with 90g daily",
            amount: "3+ servings/day",
            ways: ["Brown rice", "Oatmeal", "Whole wheat bread"]
        },
        {
            name: "Nuts",
            benefits: "39-45% lower death risk",
            amount: "3+ oz servings/week",
            ways: ["Snacks", "Salad toppings", "Nut butter"]
        },
        {
            name: "Berries",
            benefits: "High antioxidants, 8g fiber/cup",
            amount: "Daily variety",
            ways: ["Smoothies", "Yogurt", "Oatmeal"]
        },
        {
            name: "Fatty Fish",
            benefits: "Omega-3s for heart/brain health",
            amount: "2-3 servings/week",
            ways: ["Salmon salads", "Fish tacos"]
        },
        {
            name: "Olive Oil",
            benefits: "Anti-inflammatory fats",
            amount: "2-3 tbsp daily",
            ways: ["Cooking", "Salad dressings"]
        }
    ];

    // DOM elements
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    const sortColumn = document.getElementById('sortColumn');
    const sortDirection = document.getElementById('sortDirection');
    const tableHeaders = document.querySelectorAll('.longevity-table th');

    // Initialize table
    function renderTable(data) {
        tableBody.innerHTML = '';
        
        data.forEach(food => {
            const row = document.createElement('tr');
            
            // Create ways list
            const waysList = food.ways.map(way => `<li>${way}</li>`).join('');
            
            row.innerHTML = `
                <td data-label="Longevity Food">
                    <div class="food-name">${food.name}</div>
                </td>
                <td data-label="Key Benefits">
                    <div class="benefit-highlight">${food.benefits}</div>
                </td>
                <td data-label="How Much">
                    <span class="serving-info">${food.amount}</span>
                </td>
                <td data-label="Easy Ways to Add">
                    <ul class="ways-list">${waysList}</ul>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    // Filter function
    function filterTable() {
        const searchTerm = searchInput.value.toLowerCase();
        
        const filteredData = foodData.filter(food => 
            food.name.toLowerCase().includes(searchTerm) ||
            food.benefits.toLowerCase().includes(searchTerm) ||
            food.amount.toLowerCase().includes(searchTerm) ||
            food.ways.some(way => way.toLowerCase().includes(searchTerm))
        );
        
        renderTable(filteredData);
    }

    // Sort function
    function sortTable() {
        const columnIndex = parseInt(sortColumn.value);
        const direction = sortDirection.value;
        
        // Reset header classes
        tableHeaders.forEach(header => {
            header.classList.remove('sorted-asc', 'sorted-desc');
        });
        
        // Set active header class
        if (columnIndex >= 0) {
            const activeHeader = tableHeaders[columnIndex];
            activeHeader.classList.add(direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
        }
        
        const sortedData = [...foodData].sort((a, b) => {
            let aValue, bValue;
            
            switch(columnIndex) {
                case 0: // Food name
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 1: // Benefits
                    aValue = a.benefits.toLowerCase();
                    bValue = b.benefits.toLowerCase();
                    break;
                case 2: // How much
                    aValue = a.amount.toLowerCase();
                    bValue = b.amount.toLowerCase();
                    break;
                case 3: // Ways to add
                    aValue = a.ways.join(' ').toLowerCase();
                    bValue = b.ways.join(' ').toLowerCase();
                    break;
                default:
                    return 0;
            }
            
            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        
        renderTable(sortedData);
    }

    // Header click sorting
    tableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const columnIndex = header.getAttribute('data-column');
            sortColumn.value = columnIndex;
            
            // Toggle direction if clicking the same column
            if (header.classList.contains('sorted-asc')) {
                sortDirection.value = 'desc';
            } else {
                sortDirection.value = 'asc';
            }
            
            sortTable();
        });
    });

    // Event listeners
    searchInput.addEventListener('input', filterTable);
    sortColumn.addEventListener('change', sortTable);
    sortDirection.addEventListener('change', sortTable);

    // Initial render
    renderTable(foodData);
});
