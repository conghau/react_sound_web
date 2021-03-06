import React from 'react';
import PropTypes from 'prop-types';
import { chunk, isUndefined } from 'lodash';
// import Pagination from '../Pagination';
import './index.sass';
import { CONST_GENRE_ARTIST } from '../../constants';

const MainView = props => {
  const { type, isLoading } = props;
  if (isLoading) return <div className="loader" />;

  return (
    <div>
      {type === 'album' ? <AlbumView {...props} /> : <ArtistView {...props} />}
    </div>
  );
};

MainView.propTypes = {
  defaultAlbums: PropTypes.array,
  albums: PropTypes.array,
  pageChunks: PropTypes.array,
  pageChunkIndex: PropTypes.number,
  changePageChunkIndex: PropTypes.func,
  chunkSize: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  viewType: PropTypes.string
};

const AlbumView = props => {
  const { params, chunkSize, defaultAlbums, albums, Card, location } = props;
  return (
    <div className="view">
      {!albums.length &&
        location.pathname === '/albums' && (
          <Default origins={defaultAlbums} Card={Card} chunkSize={chunkSize} />
        )}
      {chunk(albums, chunkSize).map((chunk, index) => (
        <Row key={`row-chunk${index}`} chunk={chunk} Card={Card} />
      ))}
      {}
    </div>
  );
};

const ArtistView = props => {
  const {
    params,
    chunkSize,
    defaultArtists,
    genreArtists,
    Card,
    viewType
  } = props;
  if (isUndefined(viewType)) {
    return <div className="view" />;
  }
  return (
    <div className="view">
      {!artists.length &&
        viewType === CONST_GENRE_ARTIST.VIEW_DEFAULT && (
          <Default origins={defaultArtists} Card={Card} chunkSize={chunkSize} />
        )}

      {chunk(artists, chunkSize).map((chunk, index) => (
        <Row key={`row-chunk${index}`} chunk={chunk} Card={Card} />
      ))}
      {}
    </div>
  );
};

const Default = ({ origins, Card, chunkSize }) => (
  <div>
    {origins.map(origin => (
      <DefaultCards
        key={origin.id}
        {...origin}
        Card={Card}
        chunkSize={chunkSize}
      />
    ))}
  </div>
);

const DefaultCards = ({ title, id, albums, artists, Card, chunkSize }) => (
  <div className="view-cards">
    <div className="view-cards-title">
      <a href="#">
        {title} <i className="ion-chevron-right" />
      </a>
    </div>
    {chunk(albums || artists, chunkSize).map((chunk, index) => (
      <Row
        key={`row-chunk${index}`}
        chunk={chunk}
        Card={Card}
        chunkSize={chunkSize}
      />
    ))}
  </div>
);

const Row = ({ chunk, Card }) => (
  <div className="view-cards-row">
    {chunk.map(item => <Card key={item.id || item.name} {...item} />)}
  </div>
);

export default MainView;
