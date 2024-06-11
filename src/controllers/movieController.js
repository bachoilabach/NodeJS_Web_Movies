import movieService from '../services/movieService';

const handleGetAllMovies = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing parameters',
			movies: [],
		});
	}

	let movies = await movieService.getAllMovies(id);
	return res.status(200).json({
		errCode: 0,
		movies,
	});
};

const handleCreateNewMovie = async (req, res) => {
	let message = await movieService.createNewMovie(req.body);
	return res.status(200).json(message);
};

const handleEditMovie = async (req, res) => {
	let data = req.body;
	let message = await movieService.editMovie(data);
	return res.status(200).json(message);
};

const handleDeleteMovie = async (req, res) => {
	if (!req.body.movieID) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing required parameters',
		});
	}
	console.log(req.body.movieID);
	let message = await movieService.deleteMovie(req.body.movieID);
	return res.status(200).json(message);
};

const handleGetAllMovieGenres = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing parameters',
			moviegenres: [],
		});
	}

	let moviegenres = await movieService.getAllGenresMovie(id);
	return res.status(200).json({
		errCode: 0,
		moviegenres,
	});
};

const handleGetAllMovieActors = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing parameters',
			movieactors: [],
		});
	}

	let movieactors = await movieService.getAllActorsMovie(id);
	return res.status(200).json({
		errCode: 0,
		movieactors,
	});
};

const handleGetAllMovieDirectors = async (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing parameters',
			moviedirectors: [],
		});
	}

	let moviedirectors = await movieService.getAllDirectorsMovie(id);
	return res.status(200).json({
		errCode: 0,
		moviedirectors,
	});
};

const handleSearchMovie = async (req, res) => {
	try {
		const keyword = req.query.keyword;
		const movie = await movieService.searchMovie(keyword);
		return res.status(200).json({
			errCode: 0,
			movie,
		});
	} catch (error) {
		return res.status(500).json({
			errCode: 500,
			errMessage: 'Internal server error',
		});
	}
};

const handleGetMoviesCount = async (req, res) => {
	try {
		const count = await movieService.countMovies();
		return res.status(200).json({
			errCode: 0,
			errMessage: 'Count fetched successfully',
			count,
		});
	} catch (error) {
		console.error('Server Error', error);
		return res.status(500).json({
			errCode: 500,
			errMessage: 'Internal Server Error',
		});
	}
};

const handleGetMovieByImdb = async (req, res) => {
	const movies = await movieService.getMovieByImdb();
	return res.status(200).json({
		errCode: 0,
		movies,
	});
};

const handleGetMovieByRelease = async (req, res) => {
	const movies = await movieService.getMovieByRelease();
	return res.status(200).json({
		errCode: 0,
		movies,
	});
};

const handleGetMoviesbyActorID = async (req, res) => {
  const id = req.query.id
  const movies = await movieService.getMoviesByActorID(id)
  return res.status(200).json({
    errCode: 0,
    movies
  })
};

module.exports = {
	handleGetAllMovies: handleGetAllMovies,
	handleCreateNewMovie: handleCreateNewMovie,
	handleEditMovie: handleEditMovie,
	handleDeleteMovie: handleDeleteMovie,
	handleGetAllMovieGenres: handleGetAllMovieGenres,
	handleGetAllMovieActors: handleGetAllMovieActors,
	handleGetAllMovieDirectors: handleGetAllMovieDirectors,
	handleSearchMovie: handleSearchMovie,
	handleGetMoviesCount: handleGetMoviesCount,
	handleGetMovieByImdb: handleGetMovieByImdb,
	handleGetMovieByRelease: handleGetMovieByRelease,
  handleGetMoviesbyActorID: handleGetMoviesbyActorID 
};
