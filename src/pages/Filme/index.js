import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import {toast} from 'react-toastify'

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

   useEffect(() => {
    async function loadFilme(){
     await api.get(`/movie/${id}`,{
        params: {
            api_key: "7ca61eb25c2fe7d86411a9a6e0c9ad00",
            language: "pt-BR",
        }
     })
     .then((response)=> {
       setFilme(response.data);
       setLoading(false);
     })
     .catch(()=>{
        console.log('filme nao encontrado')
        navigation("/", { replace: true});
        return;
     })
    }

   loadFilme();



     return() => {
        console.log("Componente foi desmontado")
     }
   }, [navigation, id])

   function salvarFilme(){
      const minhaLista = localStorage.getItem("@victorflix");

      let filmesSalvos = JSON.parse(minhaLista) || [];

      const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

      if(hasFilme){
        toast.warn("Esse filme já está na sua lista!")
        return;
      }

      filmesSalvos.push(filme);
      localStorage.setItem("@victorflix", JSON.stringify(filmesSalvos));
      toast.success("Filme salvo com sucesso!")

   }

   if(loading){
    return(
        <div className='filme-info'>
            <h1>Carregando detalhes...</h1>
        </div>
    );
   }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
             
            <h3>Sinopse</h3>
            <spam>{filme.overview}</spam>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
             <button onClick={salvarFilme}>Salvar</button>
             <button>
                <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                    Trailer
                </a>
             </button>
            </div>
        </div>
    );
}

export default Filme;