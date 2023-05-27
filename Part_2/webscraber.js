import axios from "axios";
import { load } from "cheerio";

//url to scrape (top 250 movies on imdb)
const url = "https://www.imdb.com/chart/top/";

//movies list table tbody is called 'lister-list' followed by a tr (tablerow) tag
//each movie is a tr tag
//title is in a td tag with class 'titleColumn' followed by an a tag
//rating is in a td tag with class 'imdbRating' followed by a strong tag
//year is in a td tag with class 'secondaryInfo'

axios(url)
    .then((response) => {
        const html = response.data;
        const $ = load(html);
        const movies = $(".lister-list tr");
        const topMovies = [];

        movies.each(function () {
            const title = $(this).find(".titleColumn a").text();
            const rating = $(this).find(".imdbRating strong").text();
            const year = $(this).find(".secondaryInfo").text();
            topMovies.push({
                title,
                rating,
                year,
            });
        });
        console.log(topMovies);
    })
    .catch((err) => console.log(err));