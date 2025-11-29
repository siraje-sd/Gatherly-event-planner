import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { eventService } from '../services/eventService';

const schema = yup.object({
  title: yup.string().required('Title is required').max(200, 'Title too long'),
  description: yup.string().max(2000, 'Description too long'),
  category: yup.string().required('Category is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().required('End date is required').min(yup.ref('startDate'), 'End date must be after start date'),
  location: yup.string(),
  isPublic: yup.boolean(),
});

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      const eventData = {
        ...data,
        coverImage,
        isPublic: data.isPublic || false,
      };
      const result = await eventService.createEvent(eventData);
      navigate(`/events/${result.event._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Celebration</h1>
          <p className="text-gray-600">Tell us about your special moment and we'll help you plan it beautifully</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register('title')}
                type="text"
                id="title"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Summer Company Picnic"
                aria-required="true"
              />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>

          <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows="4"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Tell your guests what to expect at this event..."
              />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category')}
                id="category"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-required="true"
              >
                <option value="">Choose a category</option>
                <option value="wedding">Wedding</option>
                <option value="meeting">Meeting</option>
                <option value="party">Party</option>
                <option value="conference">Conference</option>
                <option value="other">Other</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                id="location"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Central Park, New York"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                Start Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                {...register('startDate')}
                type="datetime-local"
                id="startDate"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-required="true"
              />
              {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>}
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                End Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                {...register('endDate')}
                type="datetime-local"
                id="endDate"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-required="true"
              />
              {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>}
            </div>
          </div>

          <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-describedby="coverImage-help"
              />
              <p id="coverImage-help" className="mt-1 text-sm text-gray-500">
                Upload a beautiful image to represent your event (optional)
              </p>
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="max-w-xs rounded-lg" />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              {...register('isPublic')}
              type="checkbox"
              id="isPublic"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
              Make this event public
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

