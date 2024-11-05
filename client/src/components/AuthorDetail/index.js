import React from 'react';
import PropTypes from 'prop-types';

function AuthorDetail({ author, }) {
  return (
    <div className={'flex flex-row gap-4 p-6'}>
      {author?.avatar && (
        <div className={'min-w-80'}>
          <img src={`${process.env.REACT_APP_HOST_IP}/${author.avatar}`} alt={author.name}
            className='rounded object-cover'/>
        </div>
      )}
      <div className={'w-fit flex flex-col gap-2'}>
        <div className={'font-semibold text-left text-3xl'}>
          {author.fullname}
        </div>
        {author.birthday && (
          <div className={'text-left text-gray-400 text-sm'}>
            <span>Sinh ngày: {author.birthday}</span>
          </div>
        )}

        {author.nationality && (
          <div className={'text-left text-gray-400 text-sm'}>
            <span>{author.nationality}</span>
          </div>
        )}

        <div className={'text-left mt-4'}>
          {author.biography}
        </div>
      </div>
    </div>
  );
}

AuthorDetail.propTypes = {
  author: PropTypes.object.isRequired,
};

export default AuthorDetail;