import { useParams } from 'react-router-dom';

const BoardEditPage = () => {
    const {id} = useParams();

    return(
        <div>
            글 수정용 페이지{id}
        </div>
    );

}

export default BoardEditPage;