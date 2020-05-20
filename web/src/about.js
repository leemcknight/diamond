import React from 'react';


function About() {
    return (
        <div>            
            <div class="card w-50 m-5">
                <h5 class="card-header">About Diamond</h5>
                <p class="card-text">Diamond is a simple website allowing users to browse historical professional baseball games and see franchise, ballpark, and player history.  
                See play-by-play of games, review box scores and look through many more statistics</p>
            </div>
            <div class="card w-50 m-5">
                <h5 class="card-header">
                    Data
                </h5>                
                <p class="card-text">All data on this website is courtesy of <a href="https://www.retrosheet.org/">Retrosheet</a> (see the bottom the page for more information).</p>                
            </div>
            <div class="card w-50 m-5">
                <h5 class="card-header">
                    Source Code
                </h5>    
                <div class="bg-info clearfix bg-white">            
                    <p class="card-text float-left">All source code is available on Github.  Feel free to browse, or contribute!</p>
                    <a href="https://github.com/leemcknight/diamond" class="float-right"><img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1" /></a>
                </div>
                
            </div>
        </div>
    );
}


export default About;