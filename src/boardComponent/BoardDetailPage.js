import { useParams } from 'react-router-dom';

const BoardDetailPage = () => {
    const {id} = useParams();

    return(
        <div>
            상세페이지 {id}
        </div>
    );

}

export default BoardDetailPage;