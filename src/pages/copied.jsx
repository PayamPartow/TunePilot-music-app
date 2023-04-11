{ 
    const genreTitle = 'Pop';
    
    
    return(
        // flex col sets the flex direction to position the items vertically 
    <div className='flex flex-col'>
        <div className='w-full flex justify-between items-center 
        sm:flex-row flex-col mt-4 mb-10'>
            {/* select tag lets us select between multiple options */}
            <h2 className='font-bold text-3xl text-white text-left'>Discover {genreTitle}</h2>
            <select 
            // onChange={()=>()}
            value=""
            // outline-none to remove the ugly default outline all inputs have
            className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
            >
                {/* {genres.map((genre) => <Option>{genre.title}</option>)} */}
            </select>
        </div>

    </div>
    
    );
}