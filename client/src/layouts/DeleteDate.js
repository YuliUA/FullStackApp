import React from 'react'

export default function DeleteDate({ submit, change, toggleForm }) {
  return (
    <form onSubmit={submit}>
      <div className="form-group p-3">
        <button type="button" className="close" aria-label="Close" onClick={toggleForm}>
          <span aria-hidden="true">&times;</span>
        </button>
        <label htmlFor="deleted_date">Set the date</label>
        <input type="date"
          className="form-control"
          id="deleted_date"
          name="date"
          onChange={change} />
        <input type="submit" value="Confirm" className="btn btn-danger mt-3" />
      </div>
    </form>
  )
}

