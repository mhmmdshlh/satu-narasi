import { useState } from "react"
import { createDiscussion } from "../../services/forum/forum.service"

export const DiscussionForm = ({ onSuccess, onCancel }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Umum");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await createDiscussion({
                title,
                content,
                category
            });

            // Reset form
            setTitle("");
            setContent("");
            setCategory("Umum");

            if (onSuccess) onSuccess();
        } catch (err) {
            setError(err.message || "Failed to create discussion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Create New Discussion</h3>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            disabled={loading}
                        >
                            <option value="Umum">Umum</option>
                            <option value="Pertanyaan">Pertanyaan</option>
                            <option value="Infrastruktur">Infrastruktur</option>
                            <option value="Pendidikan">Pendidikan</option>
                            <option value="Lingkungan">Lingkungan</option>
                            <option value="Kesehatan">Kesehatan</option>
                            <option value="Ekonomi">Ekonomi</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Enter discussion title..."
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="What do you want to discuss?"
                            rows="6"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Discussion"}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
