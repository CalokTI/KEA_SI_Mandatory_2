import axios from "axios";
import { load } from "cheerio";
import redisClient from "./redis.js";

//url to scrape (top 250 movies on imdb)
const url = "https://www.imdb.com/chart/top/";

//movies list table tbody is called 'lister-list' followed by a tr (tablerow) tag
//each movie is a tr tag
//title is in a td tag with class 'titleColumn' followed by an a tag
//rating is in a td tag with class 'imdbRating' followed by a strong tag
//year is in a td tag with class 'secondaryInfo'

redisClient.keys("*", (error, reply) => {
	if (error) {
		console.error("Error redis keys:", error);
		return;
	}
	console.log("Keys:", reply);
});

axios(url)
	.then((response) => {
		const html = response.data;
		const $ = load(html);
		const movies = $(".lister-list tr");

		movies.each(function () {
			const number = $(this).find(".titleColumn").text().trim().split(".")[0];
			const title = $(this).find(".titleColumn a").text();
			const rating = $(this).find(".imdbRating strong").text();
			const year = $(this).find(".secondaryInfo").text();

			//save to redis
			saveToRedis(number, {
				title,
				rating,
				year,
			});
		});
        //get from redis
		getFromRedis("1");
	})
	.catch((err) => console.log(err));

//save to redis, key is position, data is a movie object
function saveToRedis(key, data) {
	redisClient.set(key, JSON.stringify(data), (error, reply) => {
		if (error) {
			console.error("Error redis set:", error);
			return;
		}
	});
}

function getFromRedis(key) {
    redisClient.get(key, (error, reply) => {
        if (error) {
            console.error("Error redis get:", error);
            return;
        }
        console.log("Get:", reply);
    });
}
