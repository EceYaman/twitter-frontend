import { useEffect, useState } from 'react';
import api from '../api';
import { FaRegComment, FaRetweet, FaHeart, FaEdit, FaTrash } from 'react-icons/fa';

export default function TweetList() {
  const [tweets, setTweets] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/tweet/findByUserId');
      setTweets(data);
    } catch {
      setError('Tweetler alınırken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (tweetId) => {
    try {
      await api.post('/like', { tweetId });
      fetchTweets();
    } catch {
      setError('Beğeni işlemi başarısız.');
    }
  };

  const handleComment = async (tweetId) => {
    const text = prompt('Yorumunuzu yazın:');
    if (!text) return;
    try {
      await api.post('/comment', { tweetId, content: text });
      fetchTweets();
    } catch {
      setError('Yorum ekleme başarısız.');
    }
  };

  const handleRetweet = async (tweetId) => {
    try {
      await api.post('/retweet', { tweetId });
      fetchTweets();
    } catch {
      setError('Retweet işlemi başarısız.');
    }
  };

  const handleDelete = async (tweetId) => {
    if (!window.confirm('Bu tweet silinsin mi?')) return;
    try {
      await api.delete(`/tweet/${tweetId}`);
      fetchTweets();
    } catch {
      setError('Tweet silinirken hata oluştu.');
    }
  };

  const handleUpdate = async (tweetId, oldContent) => {
    const newContent = prompt('Yeni içeriği girin:', oldContent);
    if (!newContent || newContent === oldContent) return;
    try {
      await api.put(`/tweet/${tweetId}`, { content: newContent });
      fetchTweets();
    } catch {
      setError('Tweet güncellenirken hata oluştu.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setError(null);
    setLoading(true);
    try {
      await api.post('/tweet', { content });
      setContent('');
      fetchTweets();
    } catch {
      setError('Tweet oluşturulurken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex items-start space-x-4">
          <img
            src={tweets[0]?.profilePhotoUrl || '/profile-placeholder.png'}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          />
          <textarea
            className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring"
            rows={3}
            placeholder="Ne düşünüyorsun?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full disabled:opacity-50"
          >
            Tweetle
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div
            key={tweet.id}
            className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <div className="flex">
              <img
                src={tweet.profilePhotoUrl || '/profile-placeholder.png'}
                alt={tweet.username}
                className="h-10 w-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-gray-800">@{tweet.username}</h4>
                    <span className="text-gray-500 text-sm">
                      {new Date(tweet.creationDate).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdate(tweet.id, tweet.content)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Düzenle"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(tweet.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Sil"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">{tweet.content}</p>
                <div className="flex space-x-6 mt-3 text-gray-600">
                  <button
                    onClick={() => handleComment(tweet.id)}
                    className="flex items-center space-x-1 hover:text-blue-500"
                  >
                    <FaRegComment />
                    <span>{tweet.commentCount}</span>
                  </button>
                  <button
                    onClick={() => handleRetweet(tweet.id)}
                    className="flex items-center space-x-1 hover:text-green-500"
                  >
                    <FaRetweet />
                    <span>{tweet.retweetCount}</span>
                  </button>
                  <button
                    onClick={() => handleLike(tweet.id)}
                    className="flex items-center space-x-1 hover:text-red-500"
                  >
                    <FaHeart />
                    <span>{tweet.likeCount}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-center py-4">Yükleniyor...</p>}
    </div>
  );
}