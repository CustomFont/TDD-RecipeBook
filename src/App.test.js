import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('Add recipe button toggles visibility of a form on the page', async () => {
  render(<App />);
  userEvent.click(screen.getByText("Add Recipe"));
  await screen.findByText('Recipe name:')
  expect(screen.getByLabelText("Recipe name:")).toBeInTheDocument();
});

const setup = () => {
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')

  return {
    instructionsInput,
    nameInput,
    submitButton
  }
}

test('typing in the recipe instructions makes the instructions appear in the form', async () => {
  render(<App/>)
  await userEvent.click(screen.getByText('Add Recipe'));
  const recipeInstructions = "kinda hard to write instructions without knowing what I'm cooking"

  await userEvent.type(screen.getByLabelText('Instructions:'), recipeInstructions)
  expect(screen.getByLabelText('Instructions:').value).toEqual(recipeInstructions);
})

test('recipe name from state appears in an unordered list', async () => {
  //const {instructionsInput, nameInput, submitButton} = setup();
  const app = render(<App />);

  await userEvent.click(app.getByText('Add Recipe'));

  // Add the submit button to your setup method:
  const submitButton = app.getByRole('button')
  const instructionsInput = app.getByLabelText('Instructions:')
  const nameInput = app.getByLabelText('Recipe name:')
  const recipeName = "Lean Pockets"
  const recipeInstructions = "place in toaster oven on 350 for 45 minutes"

  await userEvent.type(instructionsInput, recipeInstructions)
  await userEvent.type(nameInput, recipeName)
  await userEvent.click(submitButton);

  expect(screen.getByRole('listitem')).toBeInTheDocument();
  expect(screen.getByText(recipeName)).toBeInTheDocument();
})

