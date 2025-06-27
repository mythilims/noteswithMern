
// Simple Success Toast Component
function SuccessToast({ message, isVisible, onClose ,type}) {
    if (!isVisible) return null;

    return (
        <div className={`fixed top-15 right-15 ${type==='success'?'bg-green-600':'bg-red-600'} text-white py-4 px-6 rounded-lg shadow-lg  flex items-center gap-3`}>
            <span className="text-lg">{type==='success' ?'✓':''}</span>
            <span className="font-medium">{message}</span>
            {onClose && (
                <button 
                    onClick={onClose}
                    className="ml-2 text-white hover:text-gray-200 transition-colors"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

export default SuccessToast;
