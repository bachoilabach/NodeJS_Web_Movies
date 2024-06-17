import { Op, where } from 'sequelize';
import db from '../models/index';

const getAllMovies = async (movieID) => {
	
		try {
			let movies = '';
			if (movieID === 'ALL') {
				movies = await db.movie.findAll();
			}
			if (movieID && movieID !== 'ALL') {
				movies = await db.movie.findOne({
					where: { movieID: movieID },
				});
			}

			return movies
		} catch (error) {
			return (error);
		}
	}

const addGenreMovie = async (movieID, genreIDs) => {
	try {
		const movie = await getAllMovies(movieID);
		if (!movie) {
			console.log('Movie not found');
			return;
		}
		console.log(genreIDs);
		for (const genreID of genreIDs) {
			await db.moviegenre.create({
				movieID: movieID,
				genreID: genreID,
			});
		}
		console.log('Genres added successfully to the movie');
	} catch (error) {
		console.log(error);
	}
};

const addActorMovie = async (movieID, actorIDs) => {
	try {
		const movie = await getAllMovies(movieID);
		if (!movie) {
			console.log('Movie not found');
			return;
		}
		for (const actorID of actorIDs) {
			await db.movieactor.create({
				movieID: movieID,
				actorID: actorID,
			});
		}
		console.log('Actors added successfully to the movie');
	} catch (error) {
		console.log(error);
	}
};

const addDirectorMovie = async (movieID, directorIDs) => {
	try {
		const movie = await getAllMovies(movieID);
		if (!movie) {
			console.log('Movie not found');
			return;
		}
		for (const directorID of directorIDs) {
			await db.moviedirector.create({
				movieID: movieID,
				directorID: directorID,
			});
		}
		console.log('Actors added successfully to the movie');
	} catch (error) {
		console.log(error);
	}
};

const createNewMovie = async (data) => {
	
		try {
			const movieData = data.movie;
			const existingMovie = await db.movie.findOne({
				where: { title: movieData.title },
			});
			console.log(movieData);
			if (existingMovie) {
				return {
					errCode: 1,
					ereMessage: 'Movie already exists',
				}
			} else {
				const createdMovie = await db.movie.create({
					title: movieData.title,
					description: movieData.description,
					countryID: movieData.countryID,
					release: movieData.release,
					duration: movieData.duration,
					thumbnail: movieData.thumbnail,
					videoURL: movieData.videoURL,
					html: movieData.html,
					background: movieData.background,
					imdb: movieData.imdb,
				});

				const createdMovieID = createdMovie.movieID;

				const movieGenre = await addGenreMovie(
					createdMovieID,
					movieData.genres
				);

				const movieActor = await addActorMovie(
					createdMovieID,
					movieData.actors
				);

				const movieDirector = await addDirectorMovie(
					createdMovieID,
					movieData.directors
				);

				return {
					errCode: 0,
					ereMessage: 'Create Movie Success',
					createdMovie,
					movieGenre,
					movieActor,
					movieDirector,
				}
			}
		} catch (error) {
			return (error);
		}
	}

const editGenreMovie = async (data) => {
	try {
		const movieID = data.movie.movieID;
		const newGenreIDs = data.movie.genres;

		if (newGenreIDs.length > 0) {
			// Tìm và xóa tất cả các genre của movie cũ
			await db.moviegenre.destroy({
				where: { movieID: movieID },
			});

			// Thêm các genre mới vào movie
			for (const genreID of newGenreIDs) {
				await db.moviegenre.create({
					movieID: movieID,
					genreID: genreID,
				});
			}
		}

		return {
			errCode: 0,
			errMessage: 'Edit Genre Movie Success',
		};
	} catch (error) {
		return {
			errCode: 1,
			errMessage: 'Edit Genre Movie Failed',
		};
	}
};

const editActorMovie = async (data) => {
	try {
		const movieID = data.movie.movieID;
		const newActorIDs = data.movie.actors;

		// Kiểm tra nếu newActorIDs không rỗng thì thực hiện xóa và thêm liên kết
		if (newActorIDs.length > 0) {
			// Xóa tất cả các liên kết giữa phim và diễn viên của phim cũ
			await db.movieactor.destroy({
				where: { movieID: movieID },
			});

			// Thêm các liên kết mới vào movie
			for (const actorID of newActorIDs) {
				await db.movieactor.create({
					movieID: movieID,
					actorID: actorID,
				});
			}
		}

		return {
			errCode: 0,
			errMessage: 'Edit Actor Movie Success',
		};
	} catch (error) {
		return {
			errCode: 1,
			errMessage: 'Edit Actor Movie Failed',
		};
	}
};

const editDirectorMovie = async (data) => {
	try {
		const movieID = data.movie.movieID;
		const newDirectorIDs = data.movie.diretors;

		// Kiểm tra nếu newActorIDs không rỗng thì thực hiện xóa và thêm liên kết
		if (newDirectorIDs.length > 0) {
			// Xóa tất cả các liên kết giữa phim và diễn viên của phim cũ
			await db.moviedirector.destroy({
				where: { movieID: movieID },
			});

			// Thêm các liên kết mới vào movie
			for (const directorID of newDirectorIDs) {
				await db.moviedirector.create({
					movieID: movieID,
					directorID: directorID,
				});
			}
		}

		return {
			errCode: 0,
			errMessage: 'Edit Actor Movie Success',
		};
	} catch (error) {
		return {
			errCode: 1,
			errMessage: 'Edit Actor Movie Failed',
		};
	}
};

const editMovie = async (data) => {
	
		try {
			if (!data.movie.movieID) {
				return {
					errCode: 2,
					errMessage: 'Missing required parameters',
				}
			} else {
				let movie = await db.movie.findOne({
					where: { movieID: data.movie.movieID },
					raw: false,
				});

				if (movie) {
					movie.title = data.movie.title;
					movie.description = data.movie.description;
					movie.countryID = data.movie.countryID;
					movie.release = data.movie.release;
					movie.duration = data.movie.duration;
					movie.thumbnail = data.movie.thumbnail;
					movie.videoURL = data.movie.videoURL;
					movie.html = data.movie.html;
					movie.background = data.movie.background;
					movie.imdb = data.movie.imdb;
					await editGenreMovie(data);
					await editActorMovie(data);
					await editDirectorMovie(data);
					await movie.save();
					return {
						errCode: 0,
						errMessage: 'Update Success',
					}
				} else {
					return {
						errCode: 1,
						errMessage: `Movie isn't found`,
					}
				}
			}
		} catch (error) {
			return (error);
		}
	}

const deleteMovie = async (movieID) => {
	
		let movie = await db.movie.findOne({
			where: { movieID: movieID },
		});
		if (!movie) {
			return {
				errCode: 2,
				errMessage: `The movie isn't exist`,
			}
		}
		await db.moviegenre.destroy({
			where: { movieID: movieID },
		});
		await db.movieactor.destroy({
			where: { movieID: movieID },
		});
		await db.moviedirector.destroy({
			where: { movieID: movieID },
		});
		await db.movie.destroy({
			where: { movieID: movieID },
		});
		return {
			errCode: 0,
			errMessage: 'Delete Success',
		}
	}


const getAllGenresMovie = async (movieID) => {
	
		try {
			let moviegenres = '';
			if (movieID === 'ALL') {
				moviegenres = await db.moviegenre.findAll();
			}
			if (movieID && movieID !== 'ALL') {
				moviegenres = await db.moviegenre.findAll({
					where: { movieID: movieID },
				});
			}
			return moviegenres
		} catch (error) {
			return (error);
		}
	}


const getAllActorsMovie = async (movieID) => {
	
		try {
			let movieactors = '';
			if (movieID === 'ALL') {
				movieactors = await db.movieactor.findAll();
			}
			if (movieID && movieID !== 'ALL') {
				movieactors = await db.movieactor.findAll({
					where: { movieID: movieID },
				});
			}
			return movieactors
		} catch (error) {
			return (error);
		}
	}

const getAllDirectorsMovie = async (movieID) => {
	
		try {
			let moviedirectors = '';
			if (movieID === 'ALL') {
				moviedirectors = await db.moviedirector.findAll();
			}
			if (movieID && movieID !== 'ALL') {
				moviedirectors = await db.moviedirector.findAll({
					where: { movieID: movieID },
				});
			}
			return moviedirectors
		} catch (error) {
			return (error);
		}
	}

const searchMovie = async (keyword) => {
	try {
		let movieSearch = '';
		console.log(keyword);

		if (!keyword) {
			movieSearch = await db.movie.findAll();
		} else {
			movieSearch = await db.movie.findAll({
				where: {
					title: {
						[Op.substring]: `%${keyword}%`,
					},
				},
			});
		}

		return {
			errCode: 0,
			errMessage: 'Search Success',
			movieSearch,
		};
	} catch (error) {
		throw error;
	}
};

const countMovies = async () => {
	return db.movie.count();
};

const getMovieByImdb = async () => {
	try {
		let movies = '';
		movies = await db.movie.findAll({
			where: {
				imdb: { [Op.gte]: 7.5 },
			},
		});
		return movies;
	} catch (error) {
		console.log(error);
	}
};

const getMovieByRelease = async () => {
	try {
		const movies = await db.movie.findAll({
			order: [['release', 'DESC']],
			limit: 5,
		});
		return movies;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const getMoviesByActorID = async (actorID) => {
	try {
		if (actorID) {
			let movies = await db.movieactor.findAll({
				where: {
					actorID: actorID,
				},
			});
			return movies;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

module.exports = {
	getAllMovies: getAllMovies,
	getMovieByImdb: getMovieByImdb,
	createNewMovie: createNewMovie,
	editMovie: editMovie,
	deleteMovie: deleteMovie,
	getAllGenresMovie: getAllGenresMovie,
	getAllActorsMovie: getAllActorsMovie,
	getAllDirectorsMovie: getAllDirectorsMovie,
	searchMovie: searchMovie,
	countMovies: countMovies,
	getMovieByRelease: getMovieByRelease,
	getMoviesByActorID: getMoviesByActorID,
};
