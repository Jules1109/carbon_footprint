describe('Carbon Emission Predictor', () => {
    it('should make a successful prediction', () => {
      // Step 1: Visiter l'application frontend
      cy.visit('https://jules1109.github.io/carbon_footprint/');
  
      // Step 2: Remplir le formulaire
      cy.get('input[name="obfcmConsumption"]').type('6.8');
      cy.get('input[name="numVehicles"]').type('5000');
      cy.get('input[name="absoluteGap"]').type('1.2');
      cy.get('input[name="percentageGap"]').type('15.3');
      cy.get('input[name="isDieselElectric"]').check();
      cy.get('input[name="isPetrol"]').check();
  
      // Step 3: Soumettre le formulaire
      cy.contains('Predict Carbon Emission').click();
  
      // Step 4: Vérifier que la prédiction est affichée
      cy.contains('Predicted Carbon Emission').should('be.visible');
    });
  });
  