import express from 'express';
import userController from '../controllers/userController';
import actorController from '../controllers/actorController';
import genreController from '../controllers/genreController';
import directorController from '../controllers/directorController';
import movieController from '../controllers/movieController';
import countryController from '../controllers/countryController';
import commentController from '../controllers/commentController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';
const router = express.Router();

const initWebRoutes = (app) => {
	router.post('/api/login', userController.handleLogin);
	router.post('/api/user/create-new-user', userController.handleCreateNewUser);

	router.get(
		'/api/director/get-all-directors',
		directorController.handleGetAllDirectors
	);

	router.get(
		'/api/comment/get-all-comments',
		commentController.handleGetAllComments
	);
	router.get(
		'/api/comment/get-comment-by-movieID',
		commentController.handleGetCommentByMovieID
	);

	// * Country
	router.get(
		'/api/country/get-all-countries',
		countryController.hanldeGetAllCountries
	);

	router.get(
		'/api/movie/get-movies-by-Imdb',
		movieController.handleGetMovieByImdb
	);
	router.get(
		'/api/movie/get-movies-by-release',
		movieController.handleGetMovieByRelease
	);

	router.get('/api/genre/get-all-genre', genreController.handleGetAllGenres);

	router.get('/api/movie/get-all-movies', movieController.handleGetAllMovies);

	// * Movie Genre
	router.get(
		'/api/get-all-moviegenres',
		movieController.handleGetAllMovieGenres
	);

	// * Movie Director
	router.get(
		'/api/get-all-moviedirectors',
		movieController.handleGetAllMovieDirectors
	);

	// * Movie Actor
	router.get(
		'/api/get-all-movieactors',
		movieController.handleGetAllMovieActors
	);

	router.get('/api/actor/get-all-actors', actorController.handleGetAllActors);

	router.get(
		'/api/movie/get-movies-actorID',
		movieController.handleGetMoviesbyActorID
	);

	router.all('*', checkUserJWT, checkUserPermission);

	// * User
	router.get('/api/user/get-all-users', userController.handleGetAllUsers);
	router.put('/api/user/edit-user', userController.handleEditUser);
	router.delete('/api/user/delete-user', userController.handleDeleteUser);
	router.get('api/user-role', userController.handleGetAllUserRole);
	router.get('/api/user/get-search-user', userController.handleSearchUser);
	router.get('/api/user/count', userController.handleGetUserCount);

	// * Actor
	router.post(
		'/api/actor/create-new-actor',
		actorController.handleCreateNewActor
	);
	router.put('/api/actor/edit-actor', actorController.handleEditActor);
	router.delete('/api/actor/delete-actor', actorController.handleDeleteActor);
	router.get('/api/actor/get-search-actor', actorController.handleSearchActor);

	// * Director
	router.post(
		'/api/director/create-new-director',
		directorController.handleCreateNewDirector
	);
	router.put(
		'/api/director/edit-director',
		directorController.handleEditDirector
	);
	router.delete(
		'/api/director/delete-director',
		directorController.handleDeleteDirector
	);
	router.get(
		'/api/director/get-search-director',
		directorController.handleSearchDirector
	);

	// * Category
	router.post(
		'/api/genre/create-new-genre',
		genreController.handleCreateNewGenre
	);
	router.put('/api/genre/edit-genre', genreController.handleEditGenre);
	router.delete('/api/genre/delete-genre', genreController.handleDeleteGenre);
	router.get('/api/genre/get-search-genre', genreController.handleSearchGenre);

	// * Movie
	router.post(
		'/api/movie/create-new-movie',
		movieController.handleCreateNewMovie
	);
	router.put('/api/movie/edit-movie', movieController.handleEditMovie);
	router.delete('/api/movie/delete-movie', movieController.handleDeleteMovie);
	router.get('/api/movie/get-search-movie', movieController.handleSearchMovie);

	// * Movie Count
	router.get('/api/movies/count', movieController.handleGetMoviesCount);

	// * Comment

	router.post(
		'/api/comment/create-new-comment',
		commentController.handleCreateNewComment
	);

	return app.use('/', router);
};

module.exports = initWebRoutes;
