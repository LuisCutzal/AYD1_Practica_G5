import PropTypes from 'prop-types';

function NoteCard({title, description, tag}) {
  return (
    <div className='ax-w-sm rounded overflow-hidden shadow-lg bg-slate-100 hover:shadow-xl transition-shadow duration-300 ease-in-out  p-4 border-l-8 border-black' >
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{title}</div>
        <p className='text-gray-700 text-base'>{description}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span className='inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2'>{tag}</span>
      </div>
    </div>
  );
}

//validate props
NoteCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired    
};

export default NoteCard;