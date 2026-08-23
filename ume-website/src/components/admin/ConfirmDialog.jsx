import Modal from './Modal';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title = 'Confirm Delete', message = 'Are you sure?', confirmText = 'Delete', cancelText = 'Cancel' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="max-w-md">
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <i className="bi bi-exclamation-triangle-fill text-red-500 text-2xl"></i>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onClose} className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">{cancelText}</button>
          <button onClick={() => { onConfirm(); onClose(); }} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">{confirmText}</button>
        </div>
      </div>
    </Modal>
  );
}