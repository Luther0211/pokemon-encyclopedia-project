import { elements } from "./views/base"
import axios from "axios";
// M O D E L S
import Search from "./models/Search";
// V I E W S
import * as SearchView from "./views/SearchView"

/*---------------------------------------------------------------------------------------*/
const state = {};

const searchControl = () => {
	let searchQuery = SearchView.getInput() 	//Get search query

	if(searchQuery) { //start search (if there is a valid searchQuery)
		//Clear DOM for results
			SearchView.clearPreviousResults(); //clear input, result info, results

		SearchView.renderLoader()	//render loader

		state.search = new Search(searchQuery); //Create search model inside state
		
		state.search.getResults(state.DATA, state.search.searchQuery) //Look for pokemons in state.DATA
		console.log(state.search)   

		//Prepare Dom to Render new Results
		setTimeout(() => {
			SearchView.clearLoader() // Clear Loader

			if(state.search.numOfResults > 0) { // if they are results
				state.search.reOrder(); //re-order
				console.log(state.search.results)
				SearchView.renderResultInformation(state.search.results.length, state.search.searchQuery) //update result information in DOM
				SearchView.renderResultsCards(state.search.results)	//render result list
				
			} else {
				SearchView.renderResultInformation(state.search.results.length, state.search.searchQuery) //update result information in DOM
				SearchView.renderNotFound(); //render "NOT FOUND"
			}
				
		}, 1600)

	}

}


//Search input event listener
elements.searchForm.addEventListener("submit", e => {
	e.preventDefault();
	searchControl();
})

//Get basic Data & save it to state
const init = async () => {
	state.DATA = await axios("https://pokeapi.co/api/v2/pokemon/?limit=964").then(data => data.data.results)
	console.log(state.DATA)
}

window.addEventListener("load", init)