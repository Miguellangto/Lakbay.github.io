

    document.addEventListener('DOMContentLoaded', () => {
        const body = document.body;
    
        // Handle the back-to-top button visibility
        const backToTopBtn = document.getElementById('backToTopBtn');
    
        window.onscroll = function () {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                backToTopBtn.classList.add('fade-in');
                backToTopBtn.classList.remove('fade-out');
            } else {
                backToTopBtn.classList.add('fade-out');
                backToTopBtn.classList.remove('fade-in');
            }
        };
    
        // Smooth scroll to top when the button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    
        // Add other functionality here (e.g., navigation, dropdowns, etc.)
    
    });
    

    // Highlight the active navigation link
    const currentPage = window.location.pathname.split('/').pop();
    const navigationLinks = document.querySelectorAll('.navigation-links a, .right-side-element a');

    navigationLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links inside the dropdown that start with a hash (#)
    document.querySelectorAll('.dropdown-content a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Check if the href starts with "#" (for hash links)
            if (href.startsWith('#')) {
                e.preventDefault(); // Prevent the default action

                const targetId = href.substring(1); // Get the target id (remove the "#")
                const targetElement = document.getElementById(targetId); // Find the element with this id

                // Check if the target element exists before scrolling
                if (targetElement) {
                    const headerOffset = document.querySelector('.fixed-header').offsetHeight; // Get the header height
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Get the target position
                    const offsetPosition = elementPosition - headerOffset; // Adjust scroll position to account for header

                    // Smooth scroll to the adjusted position
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Hide the dropdown menu after click
                    const dropdownMenu = this.closest('.dropdown-content');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none'; // Hide the dropdown after click
                    }
                } else {
                    console.warn(`Element with id ${targetId} not found.`);
                }
            }
        });
    });

    // Search functionality for Quarter 1-4
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim().toLowerCase();
            const validQuarters = ['quarter 1', 'quarter 2', 'quarter 3', 'quarter 4'];

            if (validQuarters.includes(query)) {
                // Redirect to a search results page with the query as a URL parameter
                window.location.href = `/search?q=${encodeURIComponent(query)}`;
            } else {
                alert('Please search for Quarter 1, Quarter 2, Quarter 3, or Quarter 4.');
            }
        });
    }

    // Add fade-out class before navigating
    function fadeOutAndNavigate(url) {
        body.classList.add('fade-out');

        // Wait for the transition to finish before navigating
        setTimeout(() => {
            window.location.href = url;
        }, 500); // Match the timeout to your CSS transition duration
    }

    // Attach fade-out to links with the class "page-link"
    const pageLinks = document.querySelectorAll('a.page-link');

    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation
            const url = link.getAttribute('href'); // Get the URL to navigate to
            fadeOutAndNavigate(url);
        });
    });

    // Dropdown menu hover functionality
    const dropdownItems = document.querySelectorAll('.dropdown-content li');
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const childDropdown = this.querySelector('.child-dropdown');
            if (childDropdown) {
                childDropdown.style.display = 'block'; // Show it
                setTimeout(() => {
                    childDropdown.style.opacity = '1'; // Fade in
                    childDropdown.style.visibility = 'visible'; // Ensure it’s visible
                }, 0); // Make sure display is set before fading in
            }
        });

        item.addEventListener('mouseleave', function () {
            const childDropdown = this.querySelector('.child-dropdown');
            if (childDropdown) {
                childDropdown.style.opacity = '0'; // Fade out
                setTimeout(() => {
                    childDropdown.style.display = 'none'; // Hide it after fade
                    childDropdown.style.visibility = 'hidden'; // Hide immediately after fade
                }, 300); // Match the transition duration
            }
        });
    });

    // Set child dropdown positions based on index
    document.querySelectorAll('.parent-item').forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            const childDropdown = item.querySelector('.child-dropdown');
            if (childDropdown) {
                const offset = 10; // 10 pixels for each child dropdown
                childDropdown.style.top = `${10 + index * offset}px`; // Adjust top position based on index
                childDropdown.style.display = 'block'; // Show it
                setTimeout(() => {
                    childDropdown.style.opacity = '1'; // Fade in
                    childDropdown.style.visibility = 'visible'; // Ensure it’s visible
                }, 0); // Make sure display is set before fading in
            }
        });

        item.addEventListener('mouseleave', () => {
            const childDropdown = item.querySelector('.child-dropdown');
            if (childDropdown) {
                childDropdown.style.opacity = '0'; // Fade out
                setTimeout(() => {
                    childDropdown.style.display = 'none'; // Hide it after fade
                    childDropdown.style.visibility = 'hidden'; // Hide immediately after fade
                }, 300); // Match the transition duration
            }
        });
    });




// Function to handle dropdown hover behavior with a delay
function triggerDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown"); // Select all parent dropdowns

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("mouseenter", function () {
            const dropdownContent = this.querySelector(".dropdown-content");
            // Trigger the dropdown with a 2-second delay
            setTimeout(() => {
                dropdownContent.style.display = "block"; // Show the dropdown after 2 seconds
                dropdownContent.classList.add("show"); // Add class for animation (CSS)
            }, 0); // 2-second delay
        });

        dropdown.addEventListener("mouseleave", function () {
            const dropdownContent = this.querySelector(".dropdown-content");
            if (dropdownContent) {
                dropdownContent.classList.remove("show"); // Remove class for animation
                setTimeout(() => {
                    dropdownContent.style.display = "none"; // Hide the dropdown after animation
                }, 500); // Wait for the animation to finish
            }
        });

        // Handle child dropdowns
        const childDropdowns = dropdown.querySelectorAll(".child-dropdown");
        childDropdowns.forEach(childDropdown => {
            childDropdown.addEventListener("mouseenter", function () {
                const childDropdownContent = this.querySelector(".child-dropdown-content");
                // Trigger the child dropdown with a 2-second delay
                setTimeout(() => {
                    childDropdownContent.style.display = "block"; // Show the child dropdown after 2 seconds
                    childDropdownContent.classList.add("show"); // Add class for animation
                }, 2000); // 2-second delay
            });

            childDropdown.addEventListener("mouseleave", function () {
                const childDropdownContent = this.querySelector(".child-dropdown-content");
                if (childDropdownContent) {
                    childDropdownContent.classList.remove("show"); // Remove class for animation
                    setTimeout(() => {
                        childDropdownContent.style.display = "none"; // Hide the child dropdown
                    }, 500); // Wait for the animation to finish
                }
            });
        });
    });
}



// Call the function to apply dropdown triggers
triggerDropdowns();

(function () {
    "use strict";
  
    // define variables
    var items = document.querySelectorAll(".timeline li");
  
    // check if an element is in viewport
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }
  
    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  })();
  
  window.addEventListener("scroll", function() {
    const header = document.querySelector(".fixed-header");
    if (window.scrollY > 200) { // Adjust scroll threshold as needed
      header.classList.add("show");
    } else {
      header.classList.remove("show");
    }
  });
  
  let lastScrollTop = 0; // Store the last scroll position
let currentTransformY = 0; // Track the current translation value

window.addEventListener('scroll', function() {
  const image = document.querySelector('.carousel img');
  const imagePosition = image.getBoundingClientRect();
  const scrollTop = window.scrollY; // Get the current scroll position

  // Calculate the scroll delta (how much the user has scrolled)
  const scrollDelta = scrollTop - lastScrollTop;
  lastScrollTop = scrollTop; // Update the last scroll position

  // Smoothly update the image's position
  currentTransformY += scrollDelta * 0.2; // Adjust the multiplier to control speed
  currentTransformY = Math.max(0, currentTransformY); // Prevent the image from scrolling too far upwards

  // Apply the transformation based on the calculated speed
  image.style.transform = `translateY(${currentTransformY}px)`;

  // Stop the image when it's out of view
  if (imagePosition.top >= window.innerHeight || imagePosition.bottom <= 0) {
    currentTransformY = 0;  // Reset the image position when it's no longer visible
  }
});


// Detect when the user scrolls
window.addEventListener('scroll', function() {
    let box = document.querySelector('.expect-box');
    let rect = box.getBoundingClientRect();
  
    // Add 'in-view' class when the element comes into view
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      box.classList.add('in-view');
    }
  });
  
  const expandedCard = document.getElementById('expandedCard');
const expandedContent = document.getElementById('expandedContent');
const backButton = document.getElementById('backButton');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        expandedContent.innerHTML = `<h2>${card.querySelector('h2').innerText}</h2>`;
        expandedCard.classList.add('active');
    });
});

backButton.addEventListener('click', () => {
    expandedCard.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const expandedCard = document.getElementById('expandedCard');
    const expandedContent = document.getElementById('expandedContent');
    const backButton = document.getElementById('backButton');

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.getAttribute('id');
            let contentHtml = '';
            

            if (cardId === 'card1') {
                contentHtml = `
           <h1><strong>Quarter 1 Lifelabs IPBA</strong></h1>
<br>
<br>
<h3><strong>Instructions:</strong></h3>

<p>

<br>
For this IPBA, you are tasked to produce streaming content. Research the topic you would like to talk about as your subject and identify what type of streaming content is best to use for your topic by doing the steps in the next table below.
<br>
<img src="Screenshot 2025-01-09 130144.png">
<br>
<br>
As you can see in this table, The Lifelabs Quarter 1 IPBA takes part at the 4th and 5th part which we will emphasize on. 
<br>
<br>
- Part 4:
Identify the final streaming content category/type that is appropriate to the topic. Determine the demographics of content viewers.
<br>- Part 5:
Define the need for a streaming category.
Identify the streaming platform to be used.

<br> 
<br>
<section>
  <h3 style="color:#F9D94A"><strong>3 Content Types</strong></h3>
  <p>Using Basic Research, we determined three content types that are appropriate for our topic.</p>
  <img src="image (8).png" alt="Content Image">
</section>



<section>
 <h3 style="color:#F9D94A"><strong>Demographic Information</strong></h3>
 <p>Using google forms, we gained the demographic information of our target audience (Gender, Age, Marital status, nationality, education, employment, household income). Using this information, we were able to determine which students in APEC Marikina commute using Public Transportation.</p>
  <img src="unnamed.png" alt="Unnamed Image">
</section>

<section>
<p></p>
 <h3 style="color:#F9D94A"><strong>Beliefs and Opinions on the Topic</strong></h3>
 <p>Based on the results from our survey, APEC Marikina students find the following qualities make a commute ideal: Affordable Prices, Reliability / Accessibility, Efficiency / Travel time, and Comfortability. Based on the opinion of APEC Marikina students, they are often subjected into uncomfortable, stressful commute that causes fatigue and fear. </p>
  <img src="bo topic.png" alt="BO Topic Image">
</section>

<section>

 <h3 style="color:#F9D94A"><strong>Attitudes on the topic</strong></h3>
<p></p>
 
   <br>
   <img src="aot3 topic.png">
  <img src="aot topic.png" alt="AOT Topic Image">
  



</section>
<section>
 <h3 style="color:#F9D94A"><strong>Audience Analysis</strong></h3>
 <p></p>
 <img src="aot 2 topic.png">
</section>

<section>
 <h3 style="color:#F9D94A"><strong>Chosen Streaming Platform</strong></h3>
 <p>The streaming platform that we selected is Facebook due to its particular advantages, this includes greater engagement because of its popularity, majority of the businesses are active on this platform, and the opportunity to reach large audience especially most of teenagers are using this platforms which fits to our audience target.</p>
  <img src="csp topic.png" alt="CSP Topic Image">
</section>



                    
                `;
               
            }
            

            
            else if (cardId === 'card2') {
                contentHtml = `
                <h1><strong>Quarter 2 Lifelabs IPBA</strong></h1>
                    <br>
                    <br>

                <h3><strong>Instructions:</strong></h3>
               
               
                <p>Your group is assigned to create a website containing the outline of your stream and promotional plan.<br>
Step 1: Refer to the Web Design you created.<br>
Step 2: Create a website to encode your outline and promotional plan.<br>
Step 3: Upload your webpage on a hosting site. Refer to this How- To:<a href="https://docs.google.com/document/d/1Rx6Ue_ReS3zDV6NcwJcQpvfOztSvpZA4_NNzWC8wC9U/edit?tab=t.0"> Uploading a Website for instructions</a>
Please note: You can also use other web hosting sites to upload your website.<br>
For learners attending face-to-face classes: You can present and share your created website directly using your devices. There is no need to use web hosting, as your LF can directly check your work.
<br>
For online learners: If the suggested link in the How To does not work, you can also upload your website using other web hosting sites. <br>

Step 4: Provide the link to the website in the GCR. <br>
Product: Functional website containing the outline and promotional plan.<br>

</p>

<br>
                    <section>
                    <h3 class="limp3" style="color:#F9D94A"><strong>Stream outline</strong></h3>
                    <p class="all2">Our stream outline shows the time and the allotment inside that time period, the topic, the activities, what's show inside the stream, and the audio. It is basically our plan for the actual stream and how we will execute it.</p><br>
         <!-- Applying inline style directly to image -->
    
 <img src="462562039_929182235425930_4181727609303494833_n.png">
      <br>
<br>
</section>
<br>
<br>
<section>
                    <h3 class="limp" style="color:#F9D94A"><strong>Promotion Plan</strong></h3>
                    <p class="all">Our chosen way of promoting our stream is by making a poster and promoting it via our Facebook page online, and by sharing it with our friends and families. The poster consists of Jeeps and Taxis since our stream is about transportation.</p>
                    
                      <img src="Screenshot 2024-12-09 133826.png">
                      <br>
                      </section>
                      <br>
                      <br>
                         
                    
                      <section> 
                      <h3 style="color:#F9D94A"><strong>Stream Design</strong></h3>
                      <p> Our stream outline consists of our main colors such as, yellow,black, gray, and white. we added orange as contrast as a symbol also for safety and to make our designs pop. and it also consists of modes of transportation such as the jeepney
    </p><br>
                      <img src="Untitled design.png">
                      </section>
                      <br>
                      <br>
                      <section> 
                      <h3 style="color:#F9D94A"><strong>Website:</strong></h3>
                       
    <p>This Website is made in order to compile everything related in lifelabs
    
    for Group 1 (Formerly group 2), and as a 2nd quarter IPBA for lifelabs. 
    this website contains everything from the lifelabs subject that is by 10-1 Passion's group 1 from Quarter 1 - Quarter 4 in APEC Schools Marikina Heights sy. 2024-2025. 
    </p>
                      <p>This is the link to our <a href=>website</a></p>
                      </section>

                   
                `;
                
            }

            expandedContent.innerHTML = contentHtml;
            expandedCard.classList.add('active');
        });
    });

    backButton.addEventListener('click', () => {
        expandedCard.classList.remove('active');
        expandedContent.innerHTML = ''; // Clear expanded content
    });
});

 // Back button functionality
 backButton.addEventListener('click', () => {
    // Remove the active class to trigger the closing animation
    expandedCard.classList.remove('active');
    setTimeout(() => {
        expandedContent.innerHTML = ''; // Clear content after animation
    }, 500); // Match this timeout to the CSS transition duration
});



const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', function() {
  alert("Thank you, We will reply in a moment");
});


function toggleAnswer(index) {
    const answerCard = document.querySelectorAll('.answer-card')[index];
    const isExpanded = answerCard.style.height === 'auto';
    
    if (isExpanded) {
      answerCard.style.height = '0';
    } else {
      answerCard.style.height = `${answerCard.scrollHeight}px`;
    }
  }
  

  const buttons = document.querySelectorAll('.send-email');
  const target = document.getElementById('contactinvisible');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Scroll to a fixed position from top (e.g., 400px)
      window.scrollTo({
        top: target.offsetTop - 80, // adjust for header height if needed
        behavior: 'smooth'
      });
    });
  });

jQuery(document).ready(function($){
	var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 60;

	(timelines.length > 0) && initTimeline(timelines);

	function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			//assign a left postion to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			//assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			//the timeline has been initialize - show it
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		//translate the timeline to the left('next')/right('prev') 
		(string == 'next') 
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
			
			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		for (i = 0; i < timelineComponents['timelineDates'].length; i++) { 
		    var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
		    	distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 2;
		    timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min+'px');
		}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm*width;
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);
	
		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight+'px');
	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");

        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		var dateArrays = [];
		events.each(function(){
			var dateComp = $(this).data('date').split('/'),
				newDate = new Date(dateComp[2], dateComp[1]-1, dateComp[0]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function parseDate2(events) {
		var dateArrays = [];
		events.each(function(){
			var singleDate = $(this),
				dateComp = singleDate.data('date').split('T');
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		});
	    return dateArrays;
	}

	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) { 
		    var distance = daydiff(dates[i-1], dates[i]);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});


document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle1 = document.getElementById('sidebarToggle1'); // sidebar1 button
    const sidebarToggle2 = document.getElementById('sidebarToggle2'); // sidebar2 button
    const closeSidebar = document.querySelector('.close-sidebar');
    const body = document.body;
    
    // Track sidebar state and which button opened it
    let isSidebarOpen = false;
    let openedBy = null; // 'sidebar1' or 'sidebar2'
    
    // Function to open sidebar
    function openSidebar(openedByButton) {
      sidebar.classList.add('open');
      body.classList.add('sidebar-open');
      isSidebarOpen = true;
      openedBy = openedByButton;
      
      // Hide all toggle buttons when sidebar is open
      sidebarToggle1.style.display = 'none';
      sidebarToggle2.style.display = 'none';
    }
    
    // Function to close sidebar
    function closeSidebarFunc() {
      sidebar.classList.remove('open');
      body.classList.remove('sidebar-open');
      isSidebarOpen = false;
      
      // Show appropriate toggle button based on scroll position and which button opened it
      if (window.scrollY > 100) { // Adjust this value to match your header switch point
        sidebarToggle2.style.display = 'inline-block';
        sidebarToggle1.style.display = 'none';
      } else {
        sidebarToggle1.style.display = 'inline-block';
        sidebarToggle2.style.display = 'none';
      }
      
      openedBy = null;
    }
    
    // Toggle buttons event listeners
    sidebarToggle1.addEventListener('click', () => openSidebar('sidebar1'));
    sidebarToggle2.addEventListener('click', () => openSidebar('sidebar2'));
    closeSidebar.addEventListener('click', closeSidebarFunc);
    
    // Handle scroll events to maintain sidebar state
    window.addEventListener('scroll', function() {
      if (!isSidebarOpen) {
        // Only manage toggle button visibility when sidebar is closed
        if (window.scrollY > 100) { // Adjust this value to match your header switch point
          sidebarToggle1.style.display = 'none';
          sidebarToggle2.style.display = 'inline-block';
        } else {
          sidebarToggle1.style.display = 'inline-block';
          sidebarToggle2.style.display = 'none';
        }
      }
      // When sidebar is open, do nothing - it stays open across scroll
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
      if (isSidebarOpen && !sidebar.contains(event.target) && 
          event.target !== sidebarToggle1 && event.target !== sidebarToggle2) {
        closeSidebarFunc();
      }
    });
  });

  function toggleOption(number) {
    const card = document.querySelector(`.option-card:nth-child(${number})`);
    const isActive = card.classList.contains('active');
    
    // Close all first
    document.querySelectorAll('.option-card').forEach(c => {
      c.classList.remove('active');
    });
    
    // Open clicked one if it wasn't active
    if (!isActive) {
      card.classList.add('active');
    }
  }
  


  function toggleStreamContent() {
    // Text Content Toggle
    const content1 = document.getElementById("streamContent1");
    const content2 = document.getElementById("streamContent2");

    // Carousel Toggle
    const carousel1 = document.getElementById("carousel1");
    const carousel2 = document.getElementById("carousel2");

    const isFirstVisible = content1.style.display !== "none";

    content1.style.display = isFirstVisible ? "none" : "block";
    content2.style.display = isFirstVisible ? "block" : "none";

    carousel1.style.display = isFirstVisible ? "none" : "block";
    carousel2.style.display = isFirstVisible ? "block" : "none";
  }

