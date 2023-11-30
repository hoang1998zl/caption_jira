import React, { useLayoutEffect, useState } from 'react'
import { commentService } from '../../../services/commentService'
import { useSelector } from 'react-redux'

const Comment = ({
  user,
  taskDetail,
  successMessage,
  errorMessage,
  contextHolder
}) => {
  const [lstComment, setLstComment] = useState([])
  const { token } = useSelector(state => state.user)

  const getAllComment = () => {
    commentService.getAllComment(token, taskDetail?.taskId)
      .then(res => {
        setLstComment(res.data.content)
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }

  const createComment = (data) => {
    commentService.createComment(token, data)
      .then(res => {
        successMessage(res.data.message)
        document.getElementById('newComment_input').value = ''
        getAllComment()
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }

  const updateComment = (id, content) => {
    commentService.updateComment(token, id, content)
      .then(res => {
        successMessage(res.data.message)
        getAllComment()
      })
      .catch(err => {
        console.log(err)
        errorMessage(err.message)
      })
  }

  const deleteComment = (id) => {
    commentService.deleteComment(token, id)
      .then(res => {
        successMessage(res.data.content)
        getAllComment()
      })
      .catch(err => {
        errorMessage(err.message)
      })
  }

  const renderComment = () => {
    return lstComment?.map((item, index) => {
      return (
        <form
          key={index}
          className='w-full flex gap-x-4 my-2'
          onSubmit={(e) => {
            e.preventDefault()
            if (e.target[0].value === '') return errorMessage('Please enter your comment')

            commentService.updateComment(token, item.id, e.target[0].value)
              .then(res => {
                successMessage(res.data.message)
                getAllComment()
                document.getElementById(`contentComment_${index}--`).style.display = 'none'
                document.getElementById(`contentComment_${index}-`).style.display = 'flex'
                document.getElementById(`contentComment_${index}`).readOnly = true
              })
              .catch(err => {
                document.getElementById(`contentComment_${index}`).value = item.contentComment
                errorMessage(err.message)
              })
          }}
        >
          <img
            src={item.user.avatar}
            alt=""
            className='w-10 h-10 rounded-full'
          />
          <div
            className='w-full'
          >
            <input
              id={`contentComment_${index}`}
              name="contentComment"
              className='w-full p-2 border border-gray-400 focus:outline-none rounded resize-none'
              placeholder='Add a comment'
              defaultValue={item.contentComment}
              readOnly
            />
            <div
              id={`contentComment_${index}--`}
              className='hidden gap-x-2 mt-2'
            >
              <button
                type='submit'
                className='bg-green-500 text-white px-4 py-1 rounded font-semibold'
              >
                Update
              </button>
              <button
                type='button'
                className='bg-gray-200 text-gray-900 px-4 py-1 rounded font-semibold'
                onClick={() => {
                  document.getElementById(`contentComment_${index}--`).style.display = 'none'
                  document.getElementById(`contentComment_${index}-`).style.display = 'flex'
                  document.getElementById(`contentComment_${index}`).readOnly = true
                  document.getElementById(`contentComment_${index}`).value = item.contentComment
                }}
              >
                Cancel
              </button>
            </div>
            <div
              id={`contentComment_${index}-`}
              className='flex gap-x-2 mt-2'
            >
              <button
                type='button'
                className='bg-blue-700 text-white px-4 py-1 rounded font-semibold'
                onClick={() => {
                  document.getElementById(`contentComment_${index}--`).style.display = 'flex'
                  document.getElementById(`contentComment_${index}-`).style.display = 'none'
                  document.getElementById(`contentComment_${index}`).readOnly = false
                }}
              >
                Edit
              </button>
              <button
                type='button'
                className='bg-red-600 text-white px-4 py-1 rounded font-semibold'
                onClick={() => {
                  deleteComment(item.id)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      )
    })
  }

  useLayoutEffect(() => {
    getAllComment()
  }, [])

  return (
    <div
      className='w-full mb-4'
    >
      {contextHolder}
      <p className='font-semibold mb-2'>
        Comment:
      </p>
      <div
        id='newComment'
        className='w-full flex gap-x-4'
      >
        <img
          src={user?.avatar}
          alt=""
          className='w-10 h-10 rounded-full'
        />
        <form
          className='flex-1'
          onSubmit={(e) => {
            e.preventDefault()
            const init = {
              taskId: taskDetail?.taskId,
              contentComment: e.target[0].value
            }
            if (e.target[0].value === '') return errorMessage('Please enter your comment')
            createComment(init)
          }}
        >
          <textarea
            id="newComment_input"
            name=""
            className='w-full h-28 p-2 border border-gray-400 focus:outline-none rounded resize-none'
            placeholder='Add a comment'
          />
          <div
            className='flex gap-x-2 mt-2'
          >
            <button
              type='submit'
              className='bg-green-500 text-white px-4 py-1 rounded font-semibold'
            >
              Save
            </button>
            <button
              type='button'
              className='bg-gray-200 text-gray-900 px-4 py-1 rounded font-semibold'
              onClick={() => {
                document.getElementById('newComment_input').value = ''
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {
        renderComment()
      }
    </div>
  )
}

export default Comment