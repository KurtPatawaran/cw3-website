<template>
    <div>
      <!-- Cart Button -->
      <button @click="toggleCheckout" id="chkBtn" style="padding: 10px;">
        {{ cart && cart.length > 0 ? cart.length : '' }}
        <span class="fas fa-cart-plus"></span> Cart
      </button>
  
      <!-- Sorting Pane -->
      
        <!-- <div id="sortingPane">
          <div style="margin-left: 20px; font-size: 20px; font-weight: bold;">
            <div>
              <label>
                <input v-model.trim="localSearchQuery" id="searchBar" placeholder="Search..." @input="updateSearchQuery">
              </label>
            </div>
            <br><br>
  
           
            <label v-for="(option, index) in sortingOptions" :key="index" style="display: block; margin-bottom: 5px;">
              <input type="radio" v-model="localSortOrder" :value="option.value">{{ option.label }}
            </label>
          </div>
        </div> -->
        
        <div id="viewPane">
        <!-- Subject Pane -->
        <div id="subjectPane">
          <!-- Subject Divs -->
          <div id="subjectDiv" >
            <!-- Display subject image -->
            <div id="imgDiv">
              <figure>
                <img :src="subject.image">
              </figure>
            </div>
            <!-- Display subject information -->
            <div id="subjectText">
              <p id="subText" :textContent="subject.title" style="font-size: 30px;"></p>
              <p id="subText">Location: {{ subject.location }}</p>
              <p id="subText">Space: {{ subject.availableSpaces - cartCount(subject._id) }}</p>
              <p id="subText">Price: {{ subject.price }}</p>
  
              <!-- Add to cart button, conditionally shown based on availability -->
              <button @click="addToCart(subject)" v-if="canAddToCart(subject)"> Add to cart </button>
              <!-- Disabled button if the subject is not available -->
              <button disabled="disabled" v-else> N/A </button>
  
              <!-- Display availability status -->
              <span v-if="subject.availableSpaces === cartCount(subject._id)">
                All Out!
              </span>
              <span v-else-if="subject.availableSpaces - cartCount(subject._id) < 5">
                only {{subject.availableSpaces - cartCount(subject._id)}} Left!!
              </span>
              <span v-else>
                BUY NOW!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LessonList',
    props: ['subject', 'searchQuery', 'sortOrder', 'cart'],
    data() {
      return {
        localSearchQuery: '',
        localSortOrder: '',
        sortingOptions: [
          { label: 'Subject Descending', value: 'ascSubject' },
          { label: 'Subject Ascending', value: 'descSubject' },
          { label: 'Location Descending', value: 'ascLocation' },
          { label: 'Location Ascending', value: 'descLocation' },
          { label: 'Price Low to High', value: 'ascPrice' },
          { label: 'Price High to Low', value: 'descPrice' },
          { label: 'Spaces Low to High', value: 'ascSpaces' },
          { label: 'Spaces High to Low', value: 'descSpaces' }
        ]
      };
    },
  
    computed: {
      // Computed property for filtered subjects based on search query and sorting order
      filteredSubjects() {
        let subjectsArray = this.subjects ? this.subjects.slice(0) : [];
  
        if (this.localSearchQuery) {
          const query = this.localSearchQuery.toLowerCase();
          subjectsArray = subjectsArray.filter(subject =>
            subject.title.toLowerCase().includes(query) ||
            subject.location.toLowerCase().includes(query)
          );
        }
  
        // Sorting logic based on the selected localSortOrder
        switch (this.localSortOrder) {
          case 'ascSubject':
            return subjectsArray.sort((a, b) => a.title.localeCompare(b.title));
          case 'descSubject':
            return subjectsArray.sort((a, b) => b.title.localeCompare(a.title));
          case 'ascLocation':
            return subjectsArray.sort((a, b) => a.location.localeCompare(b.location));
          case 'descLocation':
            return subjectsArray.sort((a, b) => b.location.localeCompare(a.location));
          case 'ascPrice':
            return subjectsArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          case 'descPrice':
            return subjectsArray.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          case 'ascSpaces':
            return subjectsArray.sort((a, b) => a.availableSpaces - b.availableSpaces);
          case 'descSpaces':
            return subjectsArray.sort((a, b) => b.availableSpaces - a.availableSpaces);
          default:
            return subjectsArray;
        }
      }
    },
    created() {
      console.log('Subjects in lessonslist:', this.subject); // Add this line to log the subjects array
    },
    methods: {
      // Add to cart
      addToCart(lesson) {
        this.$emit('add-to-cart', lesson);
      },
      // Update search query
      updateSearchQuery() {
        this.$emit('update:searchQuery', this.localSearchQuery);
      },
      // Placeholder method for cartCount
      cartCount(subjectId) {
        let count = 0;
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i]._id === subjectId) { // Fix: Use _id for comparison
            count++;
          }
        }
        return count;
      },
      // Placeholder method for canAddToCart
      canAddToCart(lesson) {
        return lesson.availableSpaces > this.cartCount(lesson._id); // Fix: Use _id for comparison
      },
      // Placeholder method for toggleCheckout
      toggleCheckout() {
        if (this.cart.length > 0) {
          this.$emit('toggle-checkout');
        } else {
          alert('Add a lesson to the cart to proceed to checkout.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add scoped styles as needed */
  @import './styles.css';
  </style>