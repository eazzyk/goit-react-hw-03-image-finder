import { Component } from 'react';
import { Notify } from 'notiflix';
import css from './App.module.css';
import fetchImages from '../Data';
import SearchBar from './SearchBar/SearchBar';

import Button from './Button/Button';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    status: 'idle',
    totalHits: 0,
  };

  componentDidUpdate = async (_, prevState) => {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.fetchImages();
    }
  };

  handleSearch = query => {
    if (!query) {
      Notify.failure('Field is empty');
      return;
    }
    this.setState({ query, images: [], page: 1, totalHits: 0 });
  };

  onNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fetchImages = async () => {
    const { page, query } = this.state;
    try {
      this.setState({ status: 'pending' });
      const { totalHits, hits } = await fetchImages(query, page);

      if (!totalHits) {
        this.setState({ status: 'idle' });
        Notify.failure('Sorry, there are no such images. Please try again.');
        return;
      }

      const normalizedImages = hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
        id,
        tags,
        webformatURL,
        largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...normalizedImages],
        status: 'resolved',
        totalHits,
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  render() {
    const { status, images, totalHits } = this.state;
    const showButton = status === 'resolved' && images.length !== totalHits;
    return (
      <div className={css.App}>
        <SearchBar handleSearch={this.handleSearch} />
        {images.length > 0 && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        {showButton && <Button onClick={this.onNextPage} />}
      </div>
    );
  }
}

export default App;
